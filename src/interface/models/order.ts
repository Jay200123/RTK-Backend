import { mongoose } from "../mongoose";
import { User } from "./user";
import { Product } from "./product";
import { Ratings } from "./rating";

type Payment = "cash" | "credit card" | "online payment";

type ProductOrder = {
  product: mongoose.Schema.Types.ObjectId | Product;
  quantity: number;
  rating: mongoose.Schema.Types.ObjectId | Ratings;
};

type StatusOrder =
  | "Processing"
  | "Delivered"
  | "Packed"
  | "Shipped" 
  | "Cancelled";

interface Order extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId | User;
  products: ProductOrder[];
  counter: number;
  orderNumber: string;
  date_placed: Date;
  date_delivered: Date;
  price: number;
  status: StatusOrder;
  payment: Payment;
  isCancelled: boolean;
  isCancelApproved: boolean;
  reason: string;
  createdAt: Date;  
}

export type { Order };
