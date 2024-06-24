import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiResponse, IResponseState } from "../../types/userLoginTypes";

const initialState: IResponseState = {
  data: null,
  loading: false,
  error: null,
};

const requestOTPSlice = createSlice({
  name: "OTP-REQUEST",
  initialState,
  reducers: {
    requestOTPStart(state) {
      state.loading = true;
      state.error = null;
    },
    requestOTPSuccess(state, action: PayloadAction<IApiResponse>) {
      state.loading = false;
      state.data = action.payload.data;
    },
    requestOTPFailure(state, action: PayloadAction<string>) {
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

export const { requestOTPStart, requestOTPSuccess, requestOTPFailure } =
  requestOTPSlice.actions;

export default requestOTPSlice.reducer;
