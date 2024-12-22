import { Image } from "../image";

interface Product extends Document {
  brand: string;
  product_name: string;
  description: string;
  color: string;
  price: number;
  quantity: number; 
  image: Image[];
}

export type { Product };
