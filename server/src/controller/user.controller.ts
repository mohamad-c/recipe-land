import { Request, Response, NextFunction } from "express";
import { RegisterBodyProps, ResponseModel } from "../utils/interfaces";
import { userModel } from "../model/user.model";
import EncryptionModule from "../module/encryption.module";

const encryption = new EncryptionModule()
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
      } = req.body as RegisterBodyProps;
      const registeredUser = await userModel.create({
        fullName,
        email,
        username,
        phoneNumber,
        password: encryption.encryptPassword(password),
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
