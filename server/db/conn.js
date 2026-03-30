const mongoose = require("mongoose");
require("dotenv").config();

// Remove deprecated warning
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connected successfully`);
    console.log(`Host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    console.error(error.message);

    // Extra debug info (optional)
    if (error.code) console.error("Error Code:", error.code);

    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;