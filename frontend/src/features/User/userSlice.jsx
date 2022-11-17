import UserAPI from '../../API/UserAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk(
  'user/login',
  async (arg, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await UserAPI.postSignIn(
        {
          email: arg.email,
          password: arg.password,
        },
        config
      );

      return thunkAPI.fulfillWithValue(data);
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

export const userRegister = createAsyncThunk(
  'user/register',
  async (arg, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = await UserAPI.postSignUp(
        {
          name: arg.name,
          email: arg.email,
          password: arg.password,
        },
        config
      );

      return data;
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

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (arg, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().user.userToken}`,
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = await UserAPI.getUserDetails(config);

      return data;
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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, thunkAPI) => {
    //! arg: userData
    console.log(
      `%c__Debugger__userSlice__updateUserProfile: ${JSON.stringify(userData)}`,
      'color: blue; font-weight: bold'
    );
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${thunkAPI.getState().user.userToken}`,
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = await UserAPI.putUserProfile(userData, config);

      return thunkAPI.fulfillWithValue(data);
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
  // loading: false,
  loading: 'idle',
  userInfo: null,
  userToken: null, //! get from localStorage
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    userLogout: (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        // state.loading = true;
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        // state.loading = false;
        state.loading = 'succeeded';
        state.userInfo = action.payload;
        state.userToken = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        // state.loading = false;
        state.loading = 'failed';
        state.error = action.payload; //! ????
      });
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.success = true; // registration successful
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
    builder
      .addCase(getUserDetails.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.userInfo = action.payload;
        // state.userToken = action.payload.token || null; //! ByMe
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
    builder
      .addCase(updateUserProfile.pending, (state, action) => {
        state.loading = 'idle';
        state.error = null; //! byMe
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.success = true; // update User successful
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const { userLogout } = userSlice.actions;
const reducer = userSlice.reducer;

export default reducer;
