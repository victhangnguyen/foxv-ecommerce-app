import { combineReducers } from '@reduxjs/toolkit';
//! imp reducers
import productReducer from '../features/Product/productsSlice';
import cartReducer from '../features/Cart/cartSlice';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
