import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  // cartItems: [{product: {}, qty: number }]
  // loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  cartItems: [],
  loading: 'idle',
  error: null,
};

//! thunk Action
const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, qty, thunkAPI) => {
    const response = await fetch(`/api/products/${productId}`);

    if (!response.ok) {
      return thunkAPI.rejectWithValue(response.statusText);
      // throw new Error(response.statusText);
    }

    const product = await response.json();

    const item = {
      product: product._id,
      name: product.name,
      image: product.iamge,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    };

    return thunkAPI.fulfillWithValue(item);
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = 'succeeded';

        //! {product: _id}
        const item = action.payload;

        const existingItem = state.cartItems.find(
          (cartItem) => cartItem.product === item.product
        );

        if (existingItem) {
          state.cartItems.map((cartItem) =>
            cartItem.product === existingItem.product ? item : cartItem
          );
        } else {
          state.cartItems.push(item);
        }



      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const {} = cartSlice.actions;
const reducer = cartSlice.reducer;

export default reducer;
