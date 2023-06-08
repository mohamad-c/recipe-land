import express from "express";
import UserValidation from "../validator/user.validator";
import Middlewares from "../middleware/appMiddlewares";
import UserController from "../controller/user.controller";

const requestValidation = new UserValidation();
const middlewares = new Middlewares();
const userController = new UserController();

export default class UserRoutes {
  private router = express.Router();
  routes = this.registerUserRoute();

  private registerUserRoute() {
    return this.router.post(
      "/register",
      requestValidation.registerValidation(),
      middlewares.registerValidatorResult(),
      userController.registerUser
    );
  }
}
