import axiosInstance from "../../utils/axiosInstance";
import { AppDispatch } from "../store";
import {
  getBranchPostFailure,
  getBranchPostStart,
  getBranchPostSuccess,
} from "../slices/getBranchSlice";

/**
 * getFusionBranch
 * @returns
 */
export const getFusionBranch = () => async (dispatch: AppDispatch) => {
  dispatch(getBranchPostStart());
  try {
    const response = await axiosInstance.get(`/branches/fusion`);
    dispatch(getBranchPostSuccess(response.data.data.content ?? []));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(getBranchPostFailure(error.message));
    } else {
      dispatch(getBranchPostFailure("An unknown error occurred"));
    }
  }
};
