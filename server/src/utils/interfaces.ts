import { Request } from "express";

export interface ResponseModel<T> {
  error: boolean;
  statusCode: number;
  message: string;
  errorArray?: any;
  data: T;
  token?: string;
}

export interface RegisterBodyProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}
export interface LoginBodyProps {
  username: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user: any; // Replace 'any' with the actual type of the 'user' property
}