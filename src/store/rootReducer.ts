import { combineReducers } from "@reduxjs/toolkit";

// Import your reducers here
import userLoginReducer from "./slices/userLoginSlice";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
