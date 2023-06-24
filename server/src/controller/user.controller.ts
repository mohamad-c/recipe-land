import { Request, Response, NextFunction } from "express";
import {
  LoginBodyProps,
  RegisterBodyProps,
  ResponseModel,
} from "../utils/interfaces";
import { userModel } from "../model/user.model";
import EncryptionModule from "../module/encryption.module";
import { ObjectId } from 'mongodb';

const encryption = new EncryptionModule();
export default class UserController {
  async registerUser(
    req: Request,
    res: Response<ResponseModel<RegisterBodyProps>>,
    next: NextFunction
  ) {
    try {
      const { fullName, email, username, phoneNumber, password } =
        req.body as RegisterBodyProps;
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

  async loginUser(
    req: any,
    res: Response<ResponseModel<LoginBodyProps | [] | string>>,
    next: NextFunction
  ) {
    try {
      const { password, username } = req.body as LoginBodyProps;
      const user = await userModel.findOne({ username });
      if (!user) {
        res.status(400).json({
          error: true,
          statusCode: 400,
          message: "Incorrect username or password",
          data: [],
        });
      } else {
        const isValidUser = encryption.verifyPassword(password, user.password);
        const token = encryption.createJWT(
          user.id,
          user.username,
          user.email,
          user.fullName
        );
        if (isValidUser === false) {
          res.status(400).json({
            error: true,
            statusCode: 400,
            message: "Incorrect username or password",
            data: [],
          });
        } else {
          req.user = {
            id: user.id,
          };
          res.status(200).json({
            error: false,
            statusCode: 200,
            message: "Success",
            token: token,
            data: user.fullName,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userModel.aggregate([
        {
          $match: { _id: new ObjectId(id) } // Match specific user by ID
        },
        {
          $lookup: {
            from: "recepies",
            localField: "_id",
            foreignField: "creator",
            as: "recepies"
          }
        }
      ]);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
}
