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