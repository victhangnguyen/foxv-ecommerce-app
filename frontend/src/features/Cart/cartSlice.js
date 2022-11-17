import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductAPI from '../../API/ProductAPI';

const initialState = {
  // cartItems: [{product: {}, qty: number }]
  // loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  cartItems: [],
  loading: 'idle',
  error: null,
};

//! thunk Action
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, qty }, thunkAPI) => {
    // const navigate = useNavigate();

    try {
      // console.log(
      //   `%c __Debugger__CartSlice__qty: ${qty}`,
      //   'color: green; font-weight: bold'
      // );
      const product = await ProductAPI.getDetail(productId);
      // console.log(
      //   `%c __Debugger__CartSlice__response: ${response}`,
      //   'color: green; font-weight: bold'
      // );

      // if (!response.ok) {
      //   return thunkAPI.rejectWithValue(response.statusText);
      //   // return navigate('/cart');
      //   // throw new Error(response.statusText);
      // }

      // const product = await response.json();

      const item = {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: +qty,
      };

      // console.log(
      //   `%c __Debugger__cartSlice: ${JSON.stringify(item)}`,
      //   'color: green; font-weight: bold'
      // );
      return thunkAPI.fulfillWithValue(item);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const productIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.product === productId
      );
      if (productIndex !== -1) {
        state.cartItems.splice(productIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = 'succeeded';

        //! {product: _id}
        const item = action.payload;
        // console.log(
        //   `%c __Debugger__CartSlice__item: ${JSON.stringify(item)}`,
        //   'color: blue; font-weight: bold'
        // );

        const existingItem = state.cartItems.find(
          (cartItem) => cartItem.product === item.product
        );
        // console.log(
        //   `%c __Debugger__CartSlice__existingItem: ${JSON.stringify(
        //     existingItem
        //   )}`,
        //   'color: blue; font-weight: bold'
        // );

        if (existingItem) {
          state.cartItems = state.cartItems.map((cartItem) =>
            cartItem.product === existingItem.product ? item : cartItem
          );
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = 'idle';
        // state.error = action.payload;
      });
  },
});

export const { removeFromCart } = cartSlice.actions;
const reducer = cartSlice.reducer;

export default reducer;
