import axiosInstance from "../../utils/axiosInstance";
import { IUserDetailPostRequest } from "../../types/userLoginTypes";
import {
  personalDetailPostFailure,
  personalDetailPostStart,
  personalDetailPostSuccess,
} from "../slices/userDetailPostSlice";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "../store";

/**
 * user login
 * @param data - IUserDetailRequest
 * @returns
 */
export const userDetailPost =
  (navigate: NavigateFunction, data: IUserDetailPostRequest): AppThunk =>
  async (dispatch) => {
    dispatch(personalDetailPostStart());
    try {
      const response = await axiosInstance.post("/general-customer", data);
      dispatch(personalDetailPostSuccess(response.data));
      toast.success(response.data.message);
      navigate("/document-detail");
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(personalDetailPostFailure(error.message));
        toast.error(error.message);
      } else {
        dispatch(personalDetailPostFailure("An unknown error occurred"));
      }
    }
  };
