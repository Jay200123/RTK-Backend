import { Image } from "../image";
import { Product } from "./product";
import { User } from "./user";
import mongoose from "mongoose";

interface Ratings extends Document {
    _id: string;
    rating: number;
    description: string;
    product: mongoose.Schema.Types.ObjectId | Product;  
    user: mongoose.Schema.Types.ObjectId | User;
    image: Image[];   
}

export type { Ratings };