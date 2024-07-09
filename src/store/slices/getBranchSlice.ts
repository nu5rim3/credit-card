import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBranch, IResponseState } from "../../types/userLoginTypes";

const initialState: IResponseState = {
  data: null,
  loading: false,
  error: null,
};

const getBranchSlice = createSlice({
  name: "GET_BRANCH",
  initialState,
  reducers: {
    getBranchPostStart(state) {
      state.loading = true;
      state.error = null;
    },
    getBranchPostSuccess(state, action: PayloadAction<IBranch[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    getBranchPostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBranchPostStart,
  getBranchPostSuccess,
  getBranchPostFailure,
} = getBranchSlice.actions;

export default getBranchSlice.reducer;
