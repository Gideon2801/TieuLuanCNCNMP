const app = require("./app");
const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// connecting database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandle Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
