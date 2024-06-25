import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResponseState, IUserLoginData } from "../../types/userLoginTypes";

const initialState: IResponseState = {
  data: null,
  loading: false,
  error: null,
};

const documentUpdateSlice = createSlice({
  name: "DOCUMENT_UPDATE",
  initialState,
  reducers: {
    documentUpdatePostStart(state) {
      state.loading = true;
      state.error = null;
    },
    documentUpdatePostSuccess(state, action: PayloadAction<IUserLoginData>) {
      state.loading = false;
      state.data = action.payload;
    },
    documentUpdatePostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  documentUpdatePostStart,
  documentUpdatePostSuccess,
  documentUpdatePostFailure,
} = documentUpdateSlice.actions;

export default documentUpdateSlice.reducer;
