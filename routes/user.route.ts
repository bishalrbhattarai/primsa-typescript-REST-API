import { Router } from "express";
import {
  createUser,
  fetchUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);

router.put("/:id", updateUser);
router.get("/", fetchUser);
export default router;
