import { Order as OrderType } from "../../interface";
import Order from "./model";

export class OrderService {
  static async getAll() {
    return Order.find();
  }

  static async getById(id: string) {
    return await Order.findById(id);
  }

  static async Add(data: OrderType) {
    return await Order.create(data);
  }

  static async updateById(id: string, data: Partial<OrderType>) {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteById(id: string) {
    return await Order.findByIdAndDelete(id);
  }
}
