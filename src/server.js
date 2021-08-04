import express from "express"; // node_modules폴더의 express 호출
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express(); // 서버생성
const logger = morgan("dev");

app.set("view engine", "pug"); // pug 사용
app.set("views", process.cwd() + "/src/views"); // .pug파일 위치설정

app.use(logger);
app.use(express.urlencoded({ extended: true })); // form에서 req.body 값을 읽어 오기 위해 사용
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // true: 불특정 페이지 전체에서 세션을 저장(익명의 사람이 아무나 와도 세션 생성),  false: 세션 변경이 있을 때마다 저장(로그인할때 세션 수정하면 특정대상만 세션 생성)
    saveUninitialized: false, // true: 불특정 페이지 전체에서 세션을 저장(익명의 사람이 아무나 와도 세션 생성),  false: 세션 변경이 있을 때마다 저장(로그인할때 세션 수정하면 특정대상만 세션 생성)
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // 세션을 DB에 저장
  })
); // 브라우저에 쿠키값 보냄
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads")); // express에게 /uploads url로 가서 uploads 폴더를 열 수 있게함
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);

export default app;
