const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auths");
const errorHandler = require("./middleware/error");

//load al config var
dotenv.config({ path: "./config/config.env" });

//Load Database
connectDB();

//Body parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

// Mount Routers
app.use("/api/v1/auth", authRouter);

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
