import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiResponse, IUserLoginState } from "../../types/userLoginTypes";

const initialState: IUserLoginState = {
  data: null,
  loading: false,
  error: null,
};

const validateOTPSlice = createSlice({
  name: "OTP",
  initialState,
  reducers: {
    validateOTPStart(state) {
      state.loading = true;
      state.error = null;
    },
    validateOTPSuccess(state, action: PayloadAction<IApiResponse>) {
      state.loading = false;
      state.data = action.payload.data;
    },
    validateOTPFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { validateOTPStart, validateOTPSuccess, validateOTPFailure } =
  validateOTPSlice.actions;

export default validateOTPSlice.reducer;
