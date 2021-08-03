import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, //
  useFindAndModify: true, //findByIdAndUpdate() 사용하기 위해 설정
  useCreateIndex: true, // unique:true 사용하기 위해 설정
  useFindAndModify: false, //findByIdAndUpdate 등 optional 기본값이 false인데 true로 주면 설정
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");

db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", handleOpen);
