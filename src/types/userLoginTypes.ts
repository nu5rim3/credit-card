export interface IUserLoginData {
  id: string;
  message: string;
}

export interface IUserLoginState {
  data: IUserLoginData | null;
  loading: boolean;
  error: string | null;
}

export interface IApiResponse {
  timestamp: string;
  status: number;
  data: IUserLoginData;
}

export interface IUserLoginRequest {
  nic: string;
  mobileNumber: string;
  email: string;
}
