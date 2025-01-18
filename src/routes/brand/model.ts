import { Brand, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const brandSchema: Schema<Brand> = new Schema({
  brand_name: {
    type: String,
    required: true,
  },
  image: [
    {
      public_id: String,
      url: String,  
      originalname: String,
    }
  ]
});

const Brand = model<Brand>(RESOURCE.BRANDS, brandSchema);
export default Brand;
