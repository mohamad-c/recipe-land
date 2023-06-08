export interface ResponseModel<T> {
  error: boolean;
  statusCode: number;
  message: string;
  data: T;
}