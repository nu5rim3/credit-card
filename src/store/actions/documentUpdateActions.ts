import axiosInstance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import toast from "react-hot-toast";

import {
  documentUpdatePostStart,
  documentUpdatePostSuccess,
  documentUpdatePostFailure,
} from "../slices/documentUpdateSlice";
import { NavigateFunction } from "react-router-dom";

/**
 * updateDocumentStatus
 * @param referenceNo
 * @param status
 * @returns
 */
export const updateDocumentStatus =
  (navigate: NavigateFunction, referenceNo: string, status: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(documentUpdatePostStart());
    try {
      const response = await axiosInstance.post(`/master/update`, {
        referenceNo,
        status,
      });
      dispatch(documentUpdatePostSuccess(response.data));
      toast.success(
        response.data.message ?? "All documents updated successfully"
      );
      navigate("/complete");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
        dispatch(documentUpdatePostFailure(error?.response?.data?.error));
        toast.error(error?.response?.data?.error);
      } else {
        dispatch(documentUpdatePostFailure("An unknown error occurred"));
      }
    }
  };
