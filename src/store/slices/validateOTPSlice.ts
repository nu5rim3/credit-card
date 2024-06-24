import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseState, IValidateResponse } from "../../types/userLoginTypes";

const initialState: IResponseState = {
  data: null,
  loading: false,
  error: null,
};

const validateOTPSlice = createSlice({
  name: "OTP-VALIDATE",
  initialState,
  reducers: {
    validateOTPStart(state) {
      state.loading = true;
      state.error = null;
    },
    validateOTPSuccess(state, action: PayloadAction<IValidateResponse>) {
      state.loading = false;
      state.data = action.payload;
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
