import express from "express";
import UserRoutes from "./user.routes";
import RecepiRoutes from "./recepi.routes";

const router = express.Router();
const userRoutes = new UserRoutes();
const recepiRoutes = new RecepiRoutes();

export const userRouters = router.use("/user", userRoutes.routes);
export const recepiModel = router.use("/recepi", recepiRoutes.routes)