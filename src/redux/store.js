import { applyMiddleware, combineReducers, createStore } from 'redux';
import basketReducer from './reducers/basketReducer';
import productReducer from './reducers/productReducer';
import thunk from 'redux-thunk';

// reducer'ları birleştirme
const rootReducer = combineReducers({
  basketReducer,
  productReducer,
});

// store'u oluşturma
// apply middleware fonksiyonu ile
// thunk middle'ware'ini store'a tanıtma
export default createStore(rootReducer, applyMiddleware(thunk));
