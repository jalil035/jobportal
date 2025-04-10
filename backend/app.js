import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import UserRouter from "../backend/src/Router/api.js";
import CompanyRouter from "../backend/src/Router/company.js";

import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_TIME,
  REQUEST_NUMBER,
  URL_ENCODER,
  WEB_CASH,
} from "../backend/src/config/config.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: URL_ENCODER }));
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//database connection
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", UserRouter);
app.use("/company", CompanyRouter);
