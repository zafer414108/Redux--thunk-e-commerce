import { ActionTypes } from '../actionTypes';

const initialState = {
  isLoading: false,
  isError: false,
  basket: [],
};

const basketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BASKET_LOADING:
      return { ...state, isLoading: true };

    case ActionTypes.SET_BASKET_ERROR:
      return { ...state, isLoading: false, isError: true };

    case ActionTypes.SET_BASKET:
      return {
        ...state,
        isLoading: false,
        isError: false,
        basket: payload,
      };

    case ActionTypes.ADD_TO_BASKET:
      return { ...state, basket: state.basket.concat(payload) };

    case ActionTypes.UPDATE_ITEM:
      const newBasket = state.basket.map((item) => {
        if (item.id === payload) {
          // eğerki eleman güncellenicek elemasa adetini 1 arttırak yeni diziye ekle
          return { ...item, adet: item.adet + 1 };
        } else {
          // değils direkt yeni dizye ekle
          return item;
        }
      });

      return { ...state, basket: newBasket };

    // silincek id'li elemanı state'den kaldırır
    case ActionTypes.REMOVE_ITEM:
      const filtred = state.basket.filter((i) => i.id !== payload);
      return { ...state, basket: filtred };

    default:
      return state;
  }
};

export default basketReducer;
