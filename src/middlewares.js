export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // 글로벌 변수 저장
  res.locals.siteName = "Wetube"; // 글로벌 변수 저장
  res.locals.loggedInUser = req.session.user; // 글로벌 변수 저장
  next();
};
