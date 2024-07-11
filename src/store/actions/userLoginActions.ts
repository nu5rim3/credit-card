import axiosInstance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import { IUserLoginRequest } from "../../types/userLoginTypes";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../slices/userLoginSlice";
import toast from "react-hot-toast";

/**
 * user login
 * @param data - IUserLoginRequest
 * @returns
 */
export const userLogin =
  (data: IUserLoginRequest) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post("/master/v2", data);
      dispatch(loginSuccess(response.data));
      toast.success(response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        dispatch(loginFailure(error?.response?.data?.error));
        toast.error(error?.response?.data?.error);
      } else {
        dispatch(loginFailure("An unknown error occurred"));
      }
    }
  };
