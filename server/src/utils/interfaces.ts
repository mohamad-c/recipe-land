export interface ResponseModel<T> {
  error: boolean;
  statusCode: number;
  message: string;
  errorArray?: any;
  data: T;
}

export interface RegisterBodyProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  confirmPassword: string;
}
