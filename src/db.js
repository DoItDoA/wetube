import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  useNewUrlParser: true,
  useUnifiedTopology: true, //
  useFindAndModify: true, //findByIdAndUpdate() 사용하기 위해 설정
  useCreateIndex: true, // unique:true 사용하기 위해 설정
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");

db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", handleOpen);
