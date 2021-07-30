import express from "express"; // node_modules폴더의 express 호출
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express(); // 서버생성
const logger = morgan("dev");

app.set("view engine", "pug"); // pug 사용
app.set("views", process.cwd() + "/src/views"); // .pug파일 위치설정

app.use(logger);
app.use(express.urlencoded({ extended: true })); // form에서 req.body 값을 읽어 오기 위해 사용
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);

export default app;
