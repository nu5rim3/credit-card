import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLoginData } from "../../types/userLoginTypes";

interface IGetResponse {
  data: IUserLoginData | null;
  loading: boolean;
  error: string | null;
}

const initialState: IGetResponse = {
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
  },
});

export const { loginStart, loginSuccess, loginFailure } =
  userLoginSlice.actions;

export default userLoginSlice.reducer;
