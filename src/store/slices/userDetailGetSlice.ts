import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDetailGetRespose } from "../../types/userLoginTypes";

interface IGetResponse {
  data: IUserDetailGetRespose | null;
  loading: boolean;
  error: string | null;
}

const initialState: IGetResponse = {
  data: null,
  loading: false,
  error: null,
};

const userDetailSlice = createSlice({
  name: "DETAIL-POST",
  initialState,
  reducers: {
    personalDetailGetStart(state) {
      state.loading = true;
      state.error = null;
    },
    personalDetailGetSuccess(
      state,
      action: PayloadAction<IUserDetailGetRespose>
    ) {
      state.loading = false;
      state.data = action.payload;
    },
    personalDetailGetFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  personalDetailGetStart,
  personalDetailGetSuccess,
  personalDetailGetFailure,
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
