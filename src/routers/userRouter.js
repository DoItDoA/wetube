import express from "express";
import { edit, remove, logout, see } from "../controllers/userController"; // 컨트롤러로 부터 호출

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id", see);

export default userRouter;
