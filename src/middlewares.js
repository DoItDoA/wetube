import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // 글로벌 변수 저장
  res.locals.siteName = "Wetube"; // 글로벌 변수 저장
  res.locals.loggedInUser = req.session.user || {}; // 글로벌 변수 저장, 만약 undefined이면 빈 obj 삽입
  next();
};

// 로그인하지 않은 유저 url검색 접속시 보호
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인 되어 있지 않은 유저들만 접근가능하게 설정
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

// 사용자가 보낸 파일을 dest:"폴더"에 저장하도록 설정
export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000, // fileSize: 3,000,000Byte = 3MB  맥시멈
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000,
  },
});
