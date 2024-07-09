import { combineReducers } from "@reduxjs/toolkit";

// Import your reducers here
import userLoginReducer from "./slices/userLoginSlice";
import requestOTPReducer from "./slices/requestOTPSlice";
import validateOTPReducer from "./slices/validateOTPSlice";
import userDetailPostReducer from "./slices/userDetailPostSlice";
import userDetailGetReducer from "./slices/userDetailGetSlice";
import documentUpdatePostReducer from "./slices/documentUpdateSlice";
import branchGetReducer from "./slices/getBranchSlice";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  requestOTP: requestOTPReducer,
  validateOTP: validateOTPReducer,
  userDetailPost: userDetailPostReducer,
  userDetailGet: userDetailGetReducer,
  documentUpdatePost: documentUpdatePostReducer,
  allBranches: branchGetReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
