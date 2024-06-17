import { combineReducers } from "@reduxjs/toolkit";

// Import your reducers here
import userLoginReducer from "./slices/userLoginSlice";
import requestOTPReducer from "./slices/requestOTPSlice";
import validateOTPReducer from "./slices/validateOTPSlice";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  requestOTP: requestOTPReducer,
  validateOTP: validateOTPReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
