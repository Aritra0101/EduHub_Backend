import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import upload from "express-fileupload";
import fs from "fs";
import helmet from "helmet";
import mongoose from "mongoose";

// import routers
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouter.js"
import studyMaterial from "./routers/studyMaterial.js"

// server configuration
dotenv.config();
if (!fs.existsSync("static")) fs.mkdirSync("static");
if (!fs.existsSync("static/user")) fs.mkdirSync("static/user");
if (!fs.existsSync("static/user/dp")) fs.mkdirSync("static/user/dp");
if (!fs.existsSync("static/book")) fs.mkdirSync("static/book");
if (!fs.existsSync("static/book/photo")) fs.mkdirSync("static/book/photo");
if (!fs.existsSync("static/studyMaterial")) fs.mkdirSync("static/studyMaterial");
if (!fs.existsSync("static/studyMaterial/jpg")) fs.mkdirSync("static/studyMaterial/jpg");
if (!fs.existsSync("static/studyMaterial/png")) fs.mkdirSync("static/studyMaterial/png");
if (!fs.existsSync("static/studyMaterial/pdf")) fs.mkdirSync("static/studyMaterial/pdf");

const app = express();

// global middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(upload({ limits: 5242880 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("/static", express.static("static"));


const DB = () => mongoose.connect(process.env.MONGO_DB).then(() => {
  console.log("DB successfully connected :)");
}).catch((err) => {
  console.log("Not Connected :(", err);
})
DB();

// routes
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/studyMaterial, studyMaterialRouter");


app.listen(process.env.PORT, () =>
  console.log(`Server is running at PORT ${process.env.PORT}`)
);
