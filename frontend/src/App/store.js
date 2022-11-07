import { configureStore } from '@reduxjs/toolkit';
//! imp rootReducer
import rootReducer from './rootReducer';

// configureStore(options: ConfigureStoreOptions<any, AnyAction, [ThunkMiddleware<any, AnyAction, undefined>], [StoreEnhancer<{}, {}>]>): ToolkitStore<any, AnyAction, [ThunkMiddleware<any, AnyAction, undefined>]>
const store = configureStore({ reducer: rootReducer });

export default store;
