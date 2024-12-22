import { Schema, User, model } from "../../interface";
import { RESOURCE } from "../../constants";

const userSchema: Schema<User> = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  image: [
    {
      public_id: String,
      url: String,
      originalname: String,
    },
  ],
});

const User = model<User>(RESOURCE.USERS, userSchema);

export default User;
