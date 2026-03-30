const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./db/conn");
connectDB();

require("./controllers/socket");

const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRouter");
const contactRouter = require("./routes/contactRoutes");

const app = express();
const port = process.env.PORT || 5015;

// Middlewares
app.use(cors());
app.use(express.json()); // ✅ REQUIRED

// Routes
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/contact", contactRouter);

// Static frontend
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});