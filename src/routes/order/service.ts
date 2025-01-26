import { Order as OrderType } from "../../interface";
import Order from "./model";

export class OrderService {
  static async getAll() {
    return Order.find()
      .populate({
        path: "products",
        select: "product",
        populate: {
          path: "product",
          select:
            "brand product_name price description color category quantity isNewlyCreated image",
          populate: {
            path: "brand",
            select: "brand_name",
          },
        },
      })
      .populate({
        path: "user",
        select: "fullname",
      })
      .populate({
        path: "products",
        select: "rating",
        populate: {
          path: "rating",
          select: "rating description image",
        },
      })
      .lean()
      .exec();
  }

  static async getById(id: string) {
    return await Order.findById(id)
      .populate({
        path: "products",
        select: "product",
        populate: {
          path: "product",
          select:
            "brand product_name price description color category quantity isNewlyCreated image",
          populate: {
            path: "brand",
            select: "brand_name",
          },
        },
      })
      .populate({
        path: "user",
        select: "fullname",
      })
      .populate({
        path: "products",
        select: "rating",
        populate: {
          path: "rating",
          select: "rating description image",
        },
      })
      .lean()
      .exec();
  }

  static async Add(data: OrderType) {
    return await Order.create(data);
  }

  static async updateById(id: string, data: Partial<OrderType>) {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  }

  static async findLastOrder() {
    return await Order.findOne().sort({ date_placed: -1 });
  }

  static async orderPacked(id: string) {
    return await Order.findByIdAndUpdate(
      id,
      { status: "Packed" },
      { new: true }
    );
  }

  static async orderShipped(id: string) {
    return await Order.findByIdAndUpdate(
      id,
      { status: "Shipped" },
      { new: true }
    );
  }

  static async orderDelivered(id: string) {
    return await Order.findByIdAndUpdate(
      id,
      { status: "Delivered" },
      { new: true }
    );
  }

  static async deleteById(id: string) {
    return await Order.findByIdAndDelete(id);
  }

  static async updateProductStatus(
    id: string,
    product: string,
    rating: string
  ) {
    return await Order.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "products.$[elem].isReviewed": true,
          "products.$[elem].rating": rating,
        },
      },
      {
        arrayFilters: [
          {
            "elem.product": product,
          },
        ],
      }
    );
  }
}
