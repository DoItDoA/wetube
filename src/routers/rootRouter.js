import express from "express";
import { getJoin, postJoin, login } from "../controllers/userController"; // 컨트롤러로 부터 호출
import { home, search } from "../controllers/videoController"; // 컨트롤러로 부터 호출

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search", search);

export default rootRouter;
