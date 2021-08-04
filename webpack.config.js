const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", // 변경하고자 하는 파일 (최신 자바스크립트를 구식 자바스크립트로 변경 및 압축)
  mode: "development", // development: 개발중 , production: 완성품
  watch: true, // run 실행 후 entry 안의 파일이 바뀔때마다 자동으로 run 해준다
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css", // 변경된 css파일명
    }),
  ], // MiniCssExtractPlugin 세팅
  output: {
    filename: "js/main.js", // 변경된 js파일명
    path: path.resolve(__dirname, "assets"), // 변경된 파일 위치, path.resolve->__dirname/assets
    clean: true, // output 폴더를 build 하기전에 clean 해준다
  },
  // 특정 종류의 파일들을 변형
  module: {
    rules: [
      {
        test: /\.js$/, // 자바스크립트 파일 변형
        use: {
          loader: "babel-loader", // babel-loader 사용하여 변경
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/, // scss 파일 변형
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // webpack은 역순으로 sass-loader -> css-loader -> loader 실행
        //기존 style-loader실행시 js에 css가 섞여서 나오나 MiniCssExtractPlugin이용하여 js와 css 분리
      },
    ],
  },
};
