import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiResponse, IResponseState } from "../../types/userLoginTypes";

const initialState: IResponseState = {
  data: null,
  loading: false,
  error: null,
};

const userDetailSlice = createSlice({
  name: "DETAIL-POST",
  initialState,
  reducers: {
    personalDetailPostStart(state) {
      state.loading = true;
      state.error = null;
    },
    personalDetailPostSuccess(state, action: PayloadAction<IApiResponse>) {
      state.loading = false;
      state.data = action.payload.data;
    },
    personalDetailPostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  personalDetailPostStart,
  personalDetailPostSuccess,
  personalDetailPostFailure,
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
