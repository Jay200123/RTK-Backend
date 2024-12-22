import { mongoose } from "../mongoose";
import { User } from "./user";
import { Product } from "./product";

type Payment = "cash" | "credit card" | "online payment";

type ProductOrder = {
  product: mongoose.Schema.Types.ObjectId | Product;
  quantity: number;
};

interface Order extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId | User;
  product: ProductOrder[];
  counter: number;
  orderNumber: string;
  date_placed: Date;
  date_delivered: Date;
  price: number;
  status: string;
  payment: Payment;
}

export type { Order };
