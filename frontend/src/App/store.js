import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

//! imp rootReducer
import rootReducer from './rootReducer.js';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage, //! redux-persist/lib/storage
};

// const persistedReducer = persistReducer(persistConfig, reducer = combineReducer)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore(options: ConfigureStoreOptions<any, AnyAction, [ThunkMiddleware<any, AnyAction, undefined>], [StoreEnhancer<{}, {}>]>): ToolkitStore<any, AnyAction, [ThunkMiddleware<any, AnyAction, undefined>]>
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
