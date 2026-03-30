const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { firstname, lastname, email, password, role } = req.body;

    // ✅ validation (MATCHES YOUR SCHEMA)
    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).send("All required fields missing");
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // create user (NO SPREAD)
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPass,
      role,
    });

    const savedUser = await user.save();

    return res.status(201).send({
      message: "User registered successfully",
      user: savedUser,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).send(error.message);
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Incorrect credentials");
    }

    if (role && user.role !== role) {
      return res.status(400).send("Invalid role");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect credentials");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(200).send({
      message: "User logged in successfully",
      token,
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.status(500).send(error.message);
  }
};

// ================= OTHER FUNCTIONS (UNCHANGED) =================
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.locals } }).select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const updateprofile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const result = await User.findByIdAndUpdate(req.locals, updateData, { new: true });

    return res.status(200).send({
      message: "User updated successfully",
      user: result,
    });

  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const changepassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect current password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).send("Password changed successfully");

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteuser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    await Doctor.findOneAndDelete({ userId: req.body.userId });
    await Appointment.findOneAndDelete({ userId: req.body.userId });

    return res.send("User deleted successfully");

  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
  changepassword,
};