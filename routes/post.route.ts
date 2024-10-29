import { Router } from "express";
import { createPost, fetchPost } from "../controllers/post.controller";

const router = Router();

router.post("/", createPost);
router.get("/", fetchPost);
export default router;
