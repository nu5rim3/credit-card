import axiosInstance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import toast from "react-hot-toast";
import {
  validateOTPFailure,
  validateOTPStart,
  validateOTPSuccess,
} from "../slices/validateOTPSlice";
import { NavigateFunction } from "react-router-dom";

/**
 * validate OTP
 * @param referenceId - string
 * @returns
 */
export const validateOTP =
  (navigate: NavigateFunction, referenceId: string, otpCode: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(validateOTPStart());
    try {
      const response = await axiosInstance.post(
        `/otp-request/v2/validate/${referenceId}/${otpCode}`
      );
      dispatch(validateOTPSuccess(response.data));
      toast.success(
        response.data.message ?? "OTP Code Successfully Validated!"
      );
      navigate("/personal-detail");
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(validateOTPFailure(error.message));
        toast.error(error.message);
      } else {
        dispatch(validateOTPFailure("An unknown error occurred"));
      }
    }
  };
