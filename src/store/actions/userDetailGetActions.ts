import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { AppThunk } from "../store";
import {
  personalDetailGetFailure,
  personalDetailGetStart,
  personalDetailGetSuccess,
} from "../slices/userDetailGetSlice";

/**
 * user login
 * @param identificationId - string
 * @returns
 */
export const userDetailGet =
  (referenceNo: string): AppThunk =>
  async (dispatch) => {
    dispatch(personalDetailGetStart());
    try {
      const response = await axiosInstance.get(
        `/general-customer/${referenceNo}`
      );
      dispatch(personalDetailGetSuccess(response.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(personalDetailGetFailure(error.message));
        toast.error(error.message);
      } else {
        dispatch(personalDetailGetFailure("An unknown error occurred"));
      }
    }
  };
