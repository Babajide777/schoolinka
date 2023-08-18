import { Router } from "express";
const router = Router();
import {
  deleteUser,
  editUser,
  getUser,
  loginUser,
  resgisterUser,
} from "../controllers/userController";

router.post("/register", resgisterUser);
router.post("/login", loginUser);
router.get("/get/user/:id", getUser);
router.put("/edit/user/:id", editUser);
router.delete("/delete/user/:id", deleteUser);

export default router;
