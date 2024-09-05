import { Request, Response } from "express";
import { userService } from "./service";
import User from "./model";

const { getUser, getUsers, createUser, loginUser } = userService;

class UserController {
  //-------------------GET ALL USERS-------------------
  async getUsers(req: Request, res: Response) {
    try {
      const users = await getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: "Users not found" });
    }
  }

  //-------------------GET ONE USER-------------------
  async getUser(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const user = await getUser(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }

  //-------------------CREATE USER-------------------
  async createUser(req: Request, res: Response) {
    try {
      const user = await createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  //-------------------LOGIN-------------------
  async loginUser(req: Request, res: Response) {
    try {
      const token = await loginUser(req.body);
      return res.header("authtoken", token).status(200).json("Login Succesful");
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  //-------------------DELETE USER-------------------
  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }
  //-------------------EDIT USER-------------------
  async editUser(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "User not found" });
    }
  }
}

export const userController = new UserController();
