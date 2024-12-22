import { Brand, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const brandSchema: Schema<Brand> = new Schema({
  brand_name: {
    type: String,
    required: true,
  },
});

const Brand = model<Brand>(RESOURCE.BRANDS, brandSchema);
export default Brand;
