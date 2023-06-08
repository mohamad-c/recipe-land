import express from "express";
import UserRoutes from "./user.routes";

const router = express.Router();
const userRoutes = new UserRoutes();

export const userRouters = router.use("/user", userRoutes.routes);
