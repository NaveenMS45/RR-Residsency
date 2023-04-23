require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

app.use(express.json());
const jsonProducts = require("./rooms.json");

// database
const connectDB = require("./db/connect");

// routers
const roomsRouter = require("./routes/roomsRoute");
const userRouter = require("./routes/userRoute");
const bookingRouter = require("./routes/bookingRoute");

// Test routes
app.get("/", (req, res) => {
    res.send(`<h1>RR Residency Backend API</h1>`)
});


// Endpoints
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/bookings", bookingRouter);

let port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.mongoUrl);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
