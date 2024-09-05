import User from "./model";
import { IUser } from "../../types";

class UserDao {
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async createUser(user: IUser) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async editUser(userId: string, user: IUser) {
    try {
      const updateUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
      });
      return updateUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }

  async deleteUser(userId: string) {
    try {
      const deleteUser = await User.findByIdAndDelete(userId);
      return deleteUser;
    } catch (error) {
      throw Error((error as Error).message);
    }
  }
}

export const userDao = new UserDao();
