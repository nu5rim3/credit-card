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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error) {
      dispatch(getBranchPostFailure(error?.response?.data?.error));
    } else {
      dispatch(getBranchPostFailure("An unknown error occurred"));
    }
  }
};
