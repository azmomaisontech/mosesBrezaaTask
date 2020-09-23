const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/users");
const reviewRouter = require("./routes/reviews");
const errorHandler = require("./middleware/error");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//load al config var
dotenv.config({ path: "./config/config.env" });

//Load Database
connectDB();

//Body parser
app.use(express.json());

//Sanitize Data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Protect XSS
app.use(xss());

//Prevent HTTP params polution
app.use(hpp());

//Enable Cors for Public Access
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/review", reviewRouter);

//Load errorHandler
app.use(errorHandler);

//Declare env var
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

//Load server
const server = app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`));

//Unhandled Promise Rejection Error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  //Stop server and exit
  server.close(() => process.exit(1));
});
