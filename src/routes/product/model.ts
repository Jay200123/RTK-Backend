import mongoose from "mongoose";
import { RESOURCE } from "../../constants";
import { Product, Schema, model } from "../../interface";

const productSchema: Schema<Product> = new Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RESOURCE.BRANDS,
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
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isNew: {
    type: Boolean,
    default : false,
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
