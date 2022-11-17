import ProductAPI from '../../API/ProductAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  // if you type your function argument here
  async (_, thunkAPI) => {
    try {
      // const response = await fetch(`/api/products`);
      // const response = await ProductAPI.getAPI();
      const products = await ProductAPI.getAPI();

      console.log(
        '__Debugger__features__Product__productSlice__fetchProduct__products: ',
        products
      );

      // if (!response.ok) {
      //   return thunkAPI.rejectWithValue(response.statusText);
      //   // throw new Error(response.statusText);
      // }

      // const products = await response.json();

      // console.log(
      //   '__Debugger__features__Product__productSlice__fetchProduct__products: ',
      //   products
      // );

      return thunkAPI.fulfillWithValue(products);
      // return products;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId, thunkAPI) => {
    try {
      const product = await ProductAPI.getDetail(productId);

      console.log(
        `%c __Debugger__ProductSlice__fetchProductById__product: ${JSON.stringify(
          product
        )}`,
        'color: blue; font-weight: bold'
      );

      // if (!response.ok) {
      //   return thunkAPI.rejectWithValue(response.statusText);
      //   // throw new Error(response.statusText);
      // }

      return thunkAPI.fulfillWithValue(product);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  entities: [],
  // loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //! Add reducers for additional action types here, and handle loading state as needed
    //! fetchProducts
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.entities = [];
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // Get products from state
      state.entities = action.payload;
      state.loading = 'succeeded';
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.entities = [];
      state.loading = 'failed';
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        // state.error = action.payload.error;
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }

      // console.log(
      //   '__Debugger__features__Product__productSlice__fetchProduct_rejected__action: ',
      //   action
      // );
    });
    //! fetchProductById
    builder
      .addCase(fetchProductById.pending, (state, action) => {
        // console.log(
        //   `%c __Debugger__fetchProductById.pending: state.loading: ${state.loading}`,
        //   'color: red; font-weight: bold'
        // );
        if (state.loading === 'idle' || state.loading === 'succeeded') {
          state.entities = [];
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
        // console.log(
        //   `%c __Debugger__fetchProductById.pending: state.currentRequestId: ${state.currentRequestId}`,
        //   'color: red; font-weight: bold'
        // );
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        // console.log(
        //   `%c __Debugger__fetchProductById.fulfilled: requestId: ${requestId}`,
        //   'color: red; font-weight: bold'
        // );
        // console.log(
        //   `%c __Debugger__fetchProductById.fulfilled: state.loading: ${state.loading} - state.currentRequestId: ${state.currentRequestId}`,
        //   'color: red; font-weight: bold'
        // );
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          // console.log(
          //   '%c __Debugger__features__Product__productSlice__fetchProductById__action.payload: ',
          //   'color: blue; font-weight: bold',
          //   action.payload
          // );
          state.loading = 'idle';
          state.entities.push(action.payload);
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          // state.error = action.error;
          state.error = action.payload;
          state.currentRequestId = undefined;
        }
      });
  },
});

//! export reducers Actions
export const {} = productSlice.actions;
//! export Reducer
const reducer = productSlice.reducer;
export default reducer;
