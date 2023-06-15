export interface UserModel {
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserModelLogin {
  username: string;
  password: string;
}

export interface ResponseModel<T> {
  error: boolean;
  statusCode: number;
  message: string;
  errorArray?: any[];
  data: T;
  token?: string;
}