import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//! imp reducers
import productReducer from '../features/Product/productSlice';
import cartReducer from '../features/Cart/cartSlice';
import userReducer from '../features/User/userSlice';

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage: storage, //! redux-persist/lib/storage
  whitelist: [],
};

const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  blacklist: ['loading', 'error', 'success'],
};

const userPersistConfig = {
  key: 'user',
  storage: storage,
  blacklist: ['loading', 'error', 'success'],
};

const rootReducer = combineReducers({
  product: productReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  user: persistReducer(userPersistConfig, userReducer),
});

// // const persistedReducer = persistReducer(persistConfig, reducer = combineReducer)
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistReducer(rootPersistConfig, rootReducer);
