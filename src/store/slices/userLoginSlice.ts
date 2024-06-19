import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLoginData, IUserLoginState } from "../../types/userLoginTypes";

const initialState: IUserLoginState = {
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

    // personal detail post
    personalDetailPostStart() {},
    personalDetailPostSuccess() {},
    personalDetailPostFailure() {},

    // personal detail get
    personalDetailGetStart() {},
    personalDetailGetSuccess() {},
    personalDetailGetFailure() {},

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
  personalDetailPostStart,
  personalDetailPostSuccess,
  personalDetailPostFailure,
  personalDetailGetStart,
  personalDetailGetSuccess,
  personalDetailGetFailure,
  documentDetailPostStart,
  documentDetailPostSuccess,
  documentDetailPostFailure,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
