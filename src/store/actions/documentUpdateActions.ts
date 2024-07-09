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
        response.data.message ?? "All document updated successfully"
      );
      navigate("/complete");
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(documentUpdatePostFailure(error.message));
      } else {
        dispatch(documentUpdatePostFailure("An unknown error occurred"));
      }
    }
  };
