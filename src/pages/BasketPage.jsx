import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './../components/Loading';
import {
  getBasketData,
  setBasketLoading,
} from '../redux/actions/basketActions';
import BasketItem from '../components/BasketItem';

const BasketPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.basketReducer);

  useEffect(() => {
    dispatch(setBasketLoading());
    // sepetteki ürünleri api'den alıp
    // store'a aktarıcak asenkronk aksiyon
    dispatch(getBasketData());
  }, []);

  const total_count = state.basket.reduce(
    (total, item) => total + item.adet * item.fiyat,
    0
  );

  return (
    <div className=" row px-4 py-5">
      {/* ürünler yüklenirken */}
      {state.isLoading && <Loading />}

      {/* hata olursa */}
      {state.isError && (
        <p>Üzgünüz sepet verielrlni alırken birr hata oluştu</p>
      )}

      <div className="col-md-8">
        {/* veriler gelrise */}
        {state.basket.length > 0 ? (
          state.basket.map((item) => (
            <BasketItem item={item} key={item.id} />
          ))
        ) : (
          <p className="my-5 text-center">
            Öncelikle Sepete bir ürün ekleyiniz...
          </p>
        )}
      </div>

      <div className="d-flex flex-column justify-content-start align-items-start col-md-4 ">
        <div className="w-100 bg-white text-black p-5 rounded">
          <h5 className="text-center">Toplam Tutar: {total_count}</h5>
          <button className="w-100 btn btn-primary my-2">
            Alışverişi Tamamlama
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
