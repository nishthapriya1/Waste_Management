import express from "express";
import { registerUser, loginUser, logoutUser, deleteAccount,getUsersByRole } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authRole } from "../middleware/role.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.delete("/delete-account", protect, deleteAccount);
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
router.get("/users", protect, authRole(["admin"]), getUsersByRole);

export default router;

