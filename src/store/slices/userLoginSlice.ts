import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLoginData, IUserLoginState } from "../../types/userLoginTypes";

const initialState: IUserLoginState = {
  data: null,
  loading: false,
  error: null,
};

const userLoginSlice = createSlice({
  name: "USER_LOGIN",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<IUserLoginData>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  userLoginSlice.actions;

export default userLoginSlice.reducer;
