export interface IUserLoginData {
  otpResponse: string;
  message: string;
  referenceNo: string;
  mobileNumber: string;
  stage: string;
  nic: string;
}

export interface IValidateResponse {
  message: string;
  stage: string;
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
  identifire?: string | null;
  shopIdentifire?: string | null;
  userIdentifire?: string | null;
}

export interface IResponseState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any | null;
  loading: boolean;
  error: string | null;
}

export interface IUserDetailPostRequest {
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
  relationShipToApplicant: string;
  guarantorNic: string;
  guarantorMobileNo: string;
  guarantorAddressLine1: string;
  guarantorAddressLine2?: string;
  guarantorAddressLine3?: string;
  guarantorAddressLine4?: string;
  cardCollectBranch: string;
  branchCode: string;
  nameOnCard: string;
  governmentSectorType?: string;
  pvtSectorType?: string;
  selfEmpType?: string;
  officeContactNo: string;
}

export interface IUserDetailPostResponse {
  message: string;
  referenceNo: string;
}

export interface IEntryIdFk {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  entryIdPk: string;
  referenceNo: string;
  nic: string;
  mobileNumber: string;
  email: string;
  empCategory: string | null;
  isResident: null;
  politicallyExposed: null;
  status: string;
  identifire: string | null;
  shopIdentifire: string | null;
  userIdentifire: string | null;
  version: string;
  syncStatus: null;
  stage: string;
}
export interface IUserDetailGetRespose {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  customerIdPk: 12;
  entryIdFk: IEntryIdFk;
  nationality: string;
  fullName: string;
  preferredLanguage: string;
  dob: string;
  mothersMaidenName: string;
  residencePhone: string;
  whatsappNo: string;
  additionalContactNo: string;
  residenceType: string;
  permAddressLine1: string;
  permAddressLine2: string;
  permAddressLine3: string;
  permAddressLine4: string;
  province: string;
  mailAddressLine1: string;
  mailAddressLine2: string;
  mailAddressLine3: string;
  mailAddressLine4: string;
  politicallyExposed: string;
  employmentCategory: string;
  expInPresentEmployment: string;
  occupationType: string;
  nameOfTheEmployer: string;
  designation: string;
  monthlyNetIncome: string;
  officeAddressLine1: string;
  officeAddressLine2: string;
  officeAddressLine3: string;
  officeAddressLine4: string;
  experienceInPreviousEmployment: string;
  nameOfThePreviousEmployer: string;
  guarantorName: string;
  relationShipToApplicant: string;
  guarantorNic: string;
  guarantorMobileNo: string;
  guarantorAddressLine1: string;
  guarantorAddressLine2: string;
  guarantorAddressLine3: string;
  guarantorAddressLine4: string;
  dueDate: string;
  cardCollectBranch: string;
  nameOnCard: string;
  status: string;
  governmentSectorType: string;
  pvtSectorType: string;
  selfEmpType: string;
  officeContactNo: string;
  stage: string;
  referenceNo: string;
  isCardHolderNameSame: boolean;
  isMailAddressSame: boolean;
  isWhatsAppSame: boolean;
}

export interface IBranch {
  branchCode: string;
  branchDes: string;
  branchAddressLine1: string;
  branchAddressLine2: string;
  branchAddressLine3?: string | null;
  branchAddressLine4?: string | null;
  branchDistrictCode: string;
  branchZone: string;
  branchTypeCode: string;
  branchFlag: string;
}
