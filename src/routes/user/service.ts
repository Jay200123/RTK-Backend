import User from "./model";
import { User as UserType } from "../../interface";

export class UserService {
  static async getAll() {
    return await User.find();
  }

  static async getOne(id: string) {
    return await User.findById(id);
  }

  static async getOnEmail(email: string) {
    return await User.findOne({ email });
  }

  static async Add(data: UserType) {
    return await User.create(data);
  }

  static async updateById(id: string, data: Partial<UserType>) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }
  static async deleteById(id: string) {
    return await User.findByIdAndDelete(id);
  }
}
