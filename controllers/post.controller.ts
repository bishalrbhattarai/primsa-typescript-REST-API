import { Request, Response, NextFunction } from "express";
import prisma from "../db/db.config";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { userId, title, description } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        userId: Number(userId),
        title,
        description,
      },
    });
    res.status(201).json({
      data: newPost,
      success: true,
      message: "new post created",
    });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = Number(req.params.id);
  const { email, name, password } = req.body;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password,
      },
    });
    res
      .status(201)
      .json({ success: true, message: "User updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
  }
};

export const fetchPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({
      success: true,
      message: "All Posts list",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
  }
};
