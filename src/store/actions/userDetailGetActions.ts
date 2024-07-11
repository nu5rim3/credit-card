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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        dispatch(personalDetailGetFailure(error?.response?.data?.error));
        toast.error(error?.response?.data?.error);
      } else {
        dispatch(personalDetailGetFailure("An unknown error occurred"));
      }
    }
  };
