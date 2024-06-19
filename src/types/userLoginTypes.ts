export interface IUserLoginData {
  otpResponse: string;
  message: string;
  referenceNo: string;
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

export interface IResponseState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null;
  loading: boolean;
  error: string | null;
}

export interface IUserDetailRequest {
  referenceNo: string;
  nationality: string;
  fullName: string;
  preferredLanguage: string;
  dob: string;
  mothersMaidenName: string;
  residencePhone?: string;
  whatsappNo: string;
  additionalContactNo?: string;
  residenceType: string;
  permAddressLine1: string;
  permAddressLine2?: string;
  permAddressLine3?: string;
  permAddressLine4?: string;
  province: string;
  mailAddressLine1: string;
  mailAddressLine2?: string;
  mailAddressLine3?: string;
  mailAddressLine4?: string;
  politicallyExposed: string;
  employmentCategory: string;
  expInPresentEmployment: string;
  occupationType: string;
  nameOfTheEmployer: string;
  designation: string;
  monthlyNetIncome: string;
  officeAddressLine1: string;
  officeAddressLine2?: string;
  officeAddressLine3?: string;
  officeAddressLine4?: string;
  experienceInPreviousEmployment: string;
  nameOfThePreviousEmployer: string;
  guarantorName: string;
  relationShipToApplication: string;
  guarantorNic: string;
  guarantorMobileNo: string;
  guarantorAddressLine1: string;
  guarantorAddressLine2?: string;
  guarantorAddressLine3?: string;
  guarantorAddressLine4?: string;
  dueDate: string;
  cardCollectBranch: string;
  nameOnCard: string;
  governmentSectorType?: string;
  pvtSectorType?: string;
  selfEmpType?: string;
  officeContactNo: string;
}
