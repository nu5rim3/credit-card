import axiosInstance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import toast from "react-hot-toast";
import {
  requestOTPFailure,
  requestOTPStart,
  requestOTPSuccess,
} from "../slices/requestOTPSlice";

/**
 * request OTP
 * @param referenceId
 * @returns
 */
export const requestOTP =
  (referenceId: string) => async (dispatch: AppDispatch) => {
    dispatch(requestOTPStart());
    try {
      const response = await axiosInstance.post(`/otp-request/${referenceId}`);
      dispatch(requestOTPSuccess(response.data));
      toast.success(response.data.message ?? "OTP sent to your mobile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        dispatch(requestOTPFailure(error?.response?.data?.error));
        toast.error(error?.response?.data?.error);
      } else {
        dispatch(requestOTPFailure("An unknown error occurred"));
      }
    }
  };
