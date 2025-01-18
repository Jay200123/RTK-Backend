import { mongoose } from "../mongoose";
import { Image } from "../image";  

interface Brand extends Document {
  _id: mongoose.Types.ObjectId;
  brand_name: string;
  image: Image[],
}   

export type { Brand };
