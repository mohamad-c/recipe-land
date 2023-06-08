import express from "express";
import mongoose from "mongoose";
import Middlewares from "./middleware/appMiddlewares";
import morgan from "morgan";
import { userRouters } from "./routers/index.routes";

const middlewares = new Middlewares();
export default class Application {
  private app = express();

  constructor(PORT: number, URI: string) {
    this.app.use(morgan("dev"), express.json());
    this.serverConnection(PORT);
    this.databaseConnection(URI);
    this.defineRoutes();
    this.app.use(middlewares.appErrorHandler(), middlewares.noPageFound());
  }

  serverConnection(PORT: number) {
    this.app.listen(PORT, () => {
      console.log("Server running on PORT 3000: http://localhost:3000");
    });
  }

  databaseConnection(URI: string) {
    mongoose
      .connect(URI)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log(`Error occured ${err}`);
      });
  }

  defineRoutes() {
    return this.app.use(userRouters);
  }
}
