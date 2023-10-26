require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// routes
const apiRouter = require("./router/index");

// middlewares
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

const dbConnection = async () => {
  await mongoose.connect(process.env.DB_URL);
};

app.use(express.json());
// для работы с куки
app.use(cookieParser());
// чтобы не было проблем с запросами в браузере
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
// middleware for logs
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.use(errorMiddleware);

const start = async () => {
  try {
    dbConnection()
      .then(() => console.log("DB connection was successfuly"))
      .catch((error) => {
        "DB connection was failed => error: ", error;
      });

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.log("ERROR ON START CONNECTING => ERROR: ", error);
  }
};

start();
