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
  routes = [
    this.createRecepiRoute(),
    this.getAllRecepiesRoute(),
    this.getSingleRecipeRoute(),
    this.deleteRecipeRoute(),
    this.updateRecipeRoute()
  ];

  private createRecepiRoute() {
    return this.router.post(
      "/",
      encryption.checkJWT(),
      // requestValidation.registerValidation(),
      // middlewares.registerValidatorResult(),
      recepiController.createRecepi
    );
  }

  private getAllRecepiesRoute() {
    return this.router.get(
      "/",
      encryption.checkJWT(),
      recepiController.getAllRecepies
    );
  }

  private getSingleRecipeRoute() {
    return this.router.get(
      "/:id",
      encryption.checkJWT(),
      recepiController.getRecepieById
    );
  }
  private deleteRecipeRoute(){
    return this.router.delete(
      "/:recipeId",
      encryption.checkJWT(),
      recepiController.deleteRecepi
    )
  }
  private updateRecipeRoute(){
    return this.router.put(
      "/:recipeId",
      encryption.checkJWT(),
      recepiController.updateRecepi
    )
  }
}
