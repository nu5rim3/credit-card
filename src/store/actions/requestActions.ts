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
      toast.success(response.data.message ?? "OTP sended to your mobile");
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(requestOTPFailure(error.message));
      } else {
        dispatch(requestOTPFailure("An unknown error occurred"));
      }
    }
  };
