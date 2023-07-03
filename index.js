import express from "express";
import mongoose from "mongoose";
import upload from "express-fileupload";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

// import routers
import userRouter from "./routers/userRouter.js";

// server configuration
dotenv.config();
if (!fs.existsSync("static")) fs.mkdirSync("static");

const app = express();

// global middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(upload({ limits: 5242880 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use("/static", express.static("static"));

mongoose.connect(process.env.MONGO_DB, () => console.log("DB connected"));

// routes
app.use("/user", userRouter);


app.listen(process.env.PORT, () =>
  console.log(`Server is running at PORT ${process.env.PORT}`)
);
