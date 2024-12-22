import { Image } from "../image";
import { mongoose } from "../mongoose";

type Role = "User" | "Admin";

interface User extends Document {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  address: string;
  city: string;
  contact_number: string;
  role: Role;
  image: Image;
}

export type { User };
