import { Request, Response, NextFunction } from "express";
import { RegisterBodyProps, ResponseModel } from "../utils/interfaces";
import { userModel } from "../model/user.model";

export default class UserController {
  async registerUser(
    req: Request,
    res: Response<ResponseModel<RegisterBodyProps>>,
    next: NextFunction
  ) {
    try {
      const {
        fullName,
        email,
        username,
        phoneNumber,
        password,
        confirmPassword,
      } = req.body as RegisterBodyProps;
      const registeredUser = await userModel.create({
        fullName,
        email,
        username,
        phoneNumber,
        password,
        confirmPassword,
      });
      res.status(201).json({
        error: false,
        statusCode: 201,
        message: "success",
        data: registeredUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
