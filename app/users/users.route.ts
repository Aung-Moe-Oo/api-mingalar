import { Router } from "express";
import { login, register } from "./users.controller";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/register", register);

export default userRouter;
