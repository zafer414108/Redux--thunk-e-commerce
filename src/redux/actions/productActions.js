import axios from 'axios';
import { ActionTypes } from '../actionTypes';

// aksiyon oluşturan fonksiyon
export const setLoading = () => {
  return {
    type: ActionTypes.SET_LOADING,
  };
};

export const setError = () => {
  return {
    type: ActionTypes.SET_ERROR,
  };
};

export const setProducts = (payload) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload,
  };
};

// Asenkron Thunk Aksiyonu
export const getProductData = () => (dispatch) => {
  axios
    .get('http://localhost:4000/products')
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => dispatch(setError()));
};

/*
  * Redux Thunk
  * Asenkron Aksiyon - Thunk Aksiyonu
  
  * Redux Thunk, redux kütüphaneisni genişleten bir
  * middleware(arayızlım). Redux kendisi senkron işlemleri
  * desteklerken, asenkron eylemeleri doğrudan desteklemez
  * İşte redux thunk bu durumda devreye girer
  
  * Redux thunk, redux eylemlerinin(aksiyonların) asenkron
  * olmasını sağlar. Bu özellikle ağ istekleri gibi asenkron
  * işlemleri aksiyon içerisnde gerçekleştirebiliyoruz.
  
  * Thunk, bir fonksiyonun içersine farklı bir fonksiyon çağıran 
  * anlamına gelir.
*/

// "thunk action creator"
function ornekThunkAksiyonu() {
  // asenkton işlemleri yapıcak asıl fonk.
  return async function (dispatch) {
    const data = await axios.get('...');
    dispatch({ type: 'SET_VERI', payload: data });
  };
}

// ok fonksiyonu ile kısa yazım
const ornek2 = () => async (dispatch) => {
  const data = await axios.get('...');
  dispatch({ type: 'SET_VERI', payload: data });
};
