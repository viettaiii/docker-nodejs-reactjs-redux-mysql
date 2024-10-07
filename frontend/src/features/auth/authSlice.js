import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerAuthThunk,
  loginAuthThunk,
  verifyEmailAuthThunk,
  logoutAuthThunk,
  resetPasswordAuthThunk,
  forgotPasswordAuthThunk,
  getUserSuccessThunk,
} from "./authThunk";

import { toastInfo, toastSuccess } from "../../utils/toast";
const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};
export const registerAuth = createAsyncThunk(
  "auth/registerAuth",
  async (inputs, thunkAPI) => {
    return registerAuthThunk("/auth/register", inputs, thunkAPI);
  }
);
export const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async (inputs, thunkAPI) => {
    return loginAuthThunk("/auth/login", inputs, thunkAPI);
  }
);
export const logoutAuth = createAsyncThunk(
  "auth/logoutAuth",
  async (inputs, thunkAPI) => {
    return logoutAuthThunk("/auth/logout", thunkAPI);
  }
);
export const verifyEmailAuth = createAsyncThunk(
  "auth/verifyEmailAuth",
  async (inputs, thunkAPI) => {
    return verifyEmailAuthThunk("/auth/verify-email", inputs, thunkAPI);
  }
);
export const forgotPasswordAuth = createAsyncThunk(
  "auth/forgotPasswordAuth",
  async (inputs, thunkAPI) => {
    return forgotPasswordAuthThunk("/auth/forgot-password", inputs, thunkAPI);
  }
);
export const resetPasswordAuth = createAsyncThunk(
  "auth/resetPasswordAuth",
  async (inputs, thunkAPI) => {
    return resetPasswordAuthThunk("/auth/reset-password", inputs, thunkAPI);
  }
);

export const getUserSuccess = createAsyncThunk(
  "auth/getUserSuccess",
  async (_, thunkAPI) => {
    return getUserSuccessThunk("/auth/login/success", thunkAPI);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerAuth.fulfilled, (state, action) => {
      const { message } = action.payload;
      toastSuccess(message);
      state.isLoading = false;
    });
    builder.addCase(registerAuth.rejected, (state, action) => {
      const { message } = action.payload;
      toastInfo(message);
      state.isLoading = false;
      state.isError = true;
    });

    // Login
    builder.addCase(loginAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      const { data, message } = action.payload;
      state.user = data;
      toastSuccess(message);
      state.isLoading = false;
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      const { message } = action.payload;
      toastInfo(message);
      state.isLoading = false;
      state.isError = true;
    });
    // Login google
    builder.addCase(getUserSuccess.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserSuccess.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.user = data;
      state.isLoading = false;
    });
    builder.addCase(getUserSuccess.rejected, (state, action) => {
      const { message } = action.payload;
      toastInfo(message);
      state.isLoading = false;
      state.isError = true;
    });

    // logout
    builder.addCase(logoutAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAuth.fulfilled, (state, action) => {
      const { message } = action.payload;
      state.user = null;
      toastSuccess(message);
      state.isLoading = false;
    });
    builder.addCase(logoutAuth.rejected, (state, action) => {
      const { message } = action.payload;
      toastInfo(message);
      state.isLoading = false;
      state.isError = true;
    });
    // verify email
    builder.addCase(verifyEmailAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyEmailAuth.fulfilled, (state, action) => {
      const { message } = action.payload;
      toastSuccess(message);
      state.isLoading = false;
    });
    builder.addCase(verifyEmailAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    // forgot password
    builder.addCase(forgotPasswordAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPasswordAuth.fulfilled, (state, action) => {
      const { message } = action.payload;
      toastSuccess(message);
      state.isLoading = false;
    });
    builder.addCase(forgotPasswordAuth.rejected, (state, action) => {
      const { message } = action.payload;
      toastInfo(message);
      state.isLoading = false;
      state.isError = true;
    });
    // reset password
    builder.addCase(resetPasswordAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPasswordAuth.fulfilled, (state, action) => {
      const { message } = action.payload;
      toastSuccess(message);
      state.isLoading = false;
    });
    builder.addCase(resetPasswordAuth.rejected, (state, action) => {
      const { message } = action.payload;
      toastInfo(message);
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
