import express, { NextFunction, Request, Response } from "express";
import UserValidation from "../validator/user.validator";
import Middlewares from "../middleware/appMiddlewares";
import UserController from "../controller/user.controller";
import EncryptionModule from "../module/encryption.module";
import { AuthenticatedRequest } from "../utils/interfaces";

const requestValidation = new UserValidation();
const middlewares = new Middlewares();
const userController = new UserController();
const encryption = new EncryptionModule();
export default class UserRoutes {
  private router = express.Router();
  routes = [this.someRoute(), this.registerUserRoute(), this.loginUserRoute() ];


  private someRoute() {
    return this.router.get(
      "/some",
      encryption.checkJWT(),
      (req: Request, res: Response, next: NextFunction) => {
        try {
          res.send("hello");
        } catch (error) {
          next(error);
        }
      }
    );
  }

  private registerUserRoute() {
    return this.router.post(
      "/register",
      requestValidation.registerValidation(),
      middlewares.registerValidatorResult(),
      userController.registerUser
    );
  }

  private loginUserRoute() {
    return this.router.post(
      "/login",
      requestValidation.loginValidator(),
      middlewares.registerValidatorResult(),
      userController.loginUser
    );
  }

  
}
