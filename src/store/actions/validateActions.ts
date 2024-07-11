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
        response.data.message ?? "OTP code successfully validated!"
      );
      if (response?.data?.stage === "PENDING") {
        navigate("/personal-detail");
      } else if (response?.data?.stage === "PENDING_DOCUMENT") {
        navigate("/document-detail");
      } else if (response?.data?.stage === "COMPLETED") {
        navigate("/complete");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        dispatch(validateOTPFailure(error?.response?.data?.error));
        toast.error(error?.response?.data?.error);
      } else {
        dispatch(validateOTPFailure("An unknown error occurred"));
      }
    }
  };
