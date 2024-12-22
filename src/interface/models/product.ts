import { Image } from "../image";
import { mongoose } from "../mongoose";
import { Brand } from "./brand";

interface Product extends Document {
  _id: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId | Brand; 
  product_name: string;
  description: string;
  color: string;
  price: number;
  quantity: number; 
  image: Image[];
}

export type { Product };
