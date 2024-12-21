import { Image } from "../image";

type Role = "User" | "Admin";

interface User extends Document {
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
