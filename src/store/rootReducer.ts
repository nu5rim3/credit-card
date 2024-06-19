import { combineReducers } from "@reduxjs/toolkit";

// Import your reducers here
import userLoginReducer from "./slices/userLoginSlice";
import requestOTPReducer from "./slices/requestOTPSlice";
import validateOTPReducer from "./slices/validateOTPSlice";
import userDetailPostReducer from "./slices/userDetailPostSlice";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  requestOTP: requestOTPReducer,
  validateOTP: validateOTPReducer,
  userDetailPost: userDetailPostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
