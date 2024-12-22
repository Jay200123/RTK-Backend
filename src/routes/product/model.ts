import { RESOURCE } from "../../constants";
import { Product, Schema, model } from "../../interface";

const productSchema: Schema<Product> = new Schema({
  brand: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
  image: [
    {
      public_id: String,
      url: String,
      originalname: String,
    },
  ],
});

const Product = model<Product>(RESOURCE.PRODUCTS, productSchema);
export { Product };
