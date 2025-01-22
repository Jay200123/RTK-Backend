import Rating from "./model";
import { Ratings } from "../../interface";

export class RatingService {
  static async getAll() {
    return await Rating.find()
      .populate({
        path: "user",
        select: "fullname",
      })
      .populate({
        path: "product",
        select: "product_name color category",
      });
  }

  static async getById(id: string) {
    return await Rating.findById(id)
      .populate({
        path: "user",
        select: "fullname",
      })
      .populate({
        path: "product",
        select: "product_name color category",
      });
  }

  static async Add(data: Ratings) {
    return await Rating.create(data);
  }

  static async updateById(id: string, data: Partial<Ratings>) {
    return await Rating.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
  }

  static async deleteById(id: string) {
    return await Rating.findByIdAndDelete(id);
  }
}
