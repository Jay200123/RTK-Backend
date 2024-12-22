import { mongoose } from "../mongoose";

interface Brand extends Document {
  _id: mongoose.Types.ObjectId;
  brand_name: string;
}

export type { Brand };
