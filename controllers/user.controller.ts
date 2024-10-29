import { Request, Response, NextFunction } from "express";
import prisma from "../db/db.config";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, name, password } = req.body;
  try {
    const isUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUser)
      return res.status(400).json({ success: false, message: "already taken" });

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return res
      .status(201)
      .json({ data: newUser, message: "Created User", success: true });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
  }
};

export const updateUser = async (
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

export const fetchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Post: true,
      },
    });
    res.status(200).json({
      success: true,
      message: "All Users list",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR", success: false });
  }
};
