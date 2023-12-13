import axios from 'axios';
import { ActionTypes } from './../actionTypes';

axios.defaults.baseURL = 'http://localhost:4000';

// Senkron  Aksiyonlar
export const setBasketLoading = () => ({
  type: ActionTypes.SET_BASKET_LOADING,
});

export const setBasket = (payload) => ({
  type: ActionTypes.SET_BASKET,
  payload,
});

export const setBasketError = () => ({
  type: ActionTypes.SET_BASKET_ERROR,
});

// Asenkron Aksiyonlar
// api'dan sepettekki ürünleri alıp
// store'a aktarır
export const getBasketData = () => (dispatch) => {
  axios
    .get('/basket')
    .then((res) => dispatch(setBasket(res.data)))
    .catch((err) => dispatch(setBasketError()));
};

// api'daki septe yeni ürün ekler
// ekleme başarılı olursa
// eklenen ürünü reducera aktarır
export const addToBasket = (product) => (dispatch) => {
  //1) yeni bir obje oluşturup ürün bilgelerine adet ekleme
  const newProduct = { ...product, adet: 1 };

  //2) objeden  gereksiz veirileri kaldır
  delete newProduct.renk;
  delete newProduct.ozellikler;
  delete newProduct.baslik;

  //3) api'a yeni ürünü kaydet
  axios
    .post('/basket', newProduct)
    .then((res) =>
      dispatch({
        type: ActionTypes.ADD_TO_BASKET,
        payload: newProduct,
      })
    )
    .catch((err) => setBasketError());
};

// api'deki ürünün miktarını
// 1 arttır ve reducer'a bilgi gönderiri
export const updateItem = (product) => (dispatch) => {
  axios
    .patch(`/basket/${product.id}`, { adet: product.adet + 1 })
    .then(() =>
      // api güncellenirse reducer'u güncelleyicek
      // olan aksiyonu çalıştır
      dispatch({ type: ActionTypes.UPDATE_ITEM, payload: product.id })
    );
};

// api'dan bir ürün kaldırır
// devamında kaldırığı ürün id'sini reducer'a gönderir
export const removeItem = (delete_id) => (dispatch) => {
  axios.delete(`/basket/${delete_id}`).then(() =>
    // ekranın güncellenmesi için reducer'a haber ver
    dispatch({ type: ActionTypes.REMOVE_ITEM, payload: delete_id })
  );
};
