import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseState, IUserLoginData } from "../../types/userLoginTypes";

const initialState: IResponseState = {
  data: null,
  loading: false,
  error: null,
};

const userLoginSlice = createSlice({
  name: "CREDIT",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<IUserLoginData>) {
      state.loading = false;
      state.data = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // document detail
    documentDetailPostStart() {},
    documentDetailPostSuccess() {},
    documentDetailPostFailure() {},
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  documentDetailPostStart,
  documentDetailPostSuccess,
  documentDetailPostFailure,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
