import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ResponseModel } from "../utils/interfaces";
import { validationResult } from "express-validator";

export default class Middlewares {
  noPageFound() {
    return (
      req: Request,
      res: Response<ResponseModel<any>>,
      next: NextFunction
    ) => {
      res.status(404).json({
        error: true,
        statusCode: 404,
        message: "route not found",
        data: [],
      });

      next();
    };
  }

  appErrorHandler() {
    return (
      error: any,
      req: Request,
      res: Response<ResponseModel<any>>,
      next: NextFunction
    ) => {
      if (error) {
        res.status(500).json({
          error: true,
          statusCode: error.status ?? 500,
          message: error.message ?? "route not found",
          data: [],
        });
      } else next();
    };
  }

  validatorResult() {
    return (
      req: Request,
      res: Response<ResponseModel<any>>,
      next: NextFunction
    ) => {
      const error = validationResult(req);
      let errObj: any = {}
      error.array().forEach((err: any) => {
        errObj[err.path] = err.msg;
      });
      if (error.isEmpty()) {
        next();
      } else {
        res.status(400).json({
          error: true,
          statusCode: 400,
          message: "Validation failed",
          data: [],
          errorArray: errObj,
        });
      }
    };
  }
}
