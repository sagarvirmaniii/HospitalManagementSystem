const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

const userRouter = express.Router();

// ================= USER =================
userRouter.get("/getuser/:id", auth, userController.getuser);
userRouter.get("/getallusers", auth, userController.getallusers);

// ================= AUTH =================
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

// ================= PASSWORD =================
// ❌ REMOVED (not exported in controller)
// userRouter.post("/forgotpassword", userController.forgotpassword);
// userRouter.post("/resetpassword/:id/:token", userController.resetpassword);

userRouter.put("/changepassword", auth, userController.changepassword);

// ================= PROFILE =================
userRouter.put("/updateprofile", auth, userController.updateprofile);
userRouter.delete("/deleteuser", auth, userController.deleteuser);

module.exports = userRouter;