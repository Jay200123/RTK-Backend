import { Ratings, Schema, model, mongoose } from "../../interface";
import { RESOURCE } from "../../constants";

const ratingSchema: Schema<Ratings> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RESOURCE.USERS,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RESOURCE.PRODUCTS,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
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

const Rating = model<Ratings>(RESOURCE.RATINGS, ratingSchema);
export default Rating;
