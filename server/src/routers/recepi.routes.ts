import express, { NextFunction, Request, Response } from "express";
import UserValidation from "../validator/user.validator";
import Middlewares from "../middleware/appMiddlewares";
import EncryptionModule from "../module/encryption.module";
import RecepiController from "../controller/recepi.controller";

const requestValidation = new UserValidation();
const middlewares = new Middlewares();
const recepiController = new RecepiController();
const encryption = new EncryptionModule();
export default class RecepiRoutes {
  private router = express.Router();
  routes = [this.createRecepiRoute()];

  private createRecepiRoute() {
    return this.router.post(
      "/",
      encryption.checkJWT(),
      // requestValidation.registerValidation(),
      // middlewares.registerValidatorResult(),
      recepiController.createRecepi
    );
  }
}
