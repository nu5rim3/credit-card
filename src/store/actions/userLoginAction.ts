import axiosInstance from "../../utils/axiosInstance";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "../slices/userLoginSlice";
import { AppDispatch } from "../store";
import { IUserLoginRequest } from "../../types/userLoginTypes";

export const userLogin =
  (data: IUserLoginRequest) => async (dispatch: AppDispatch) => {
    dispatch(fetchDataStart());
    try {
      const response = await axiosInstance.post("/master", data);
      dispatch(fetchDataSuccess(response.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(fetchDataFailure(error.message));
      } else {
        dispatch(fetchDataFailure("An unknown error occurred"));
      }
    }
  };
