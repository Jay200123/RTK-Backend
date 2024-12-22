import { mongoose } from "../interface";
import { STATUSCODE } from "../constants";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
    console.log("Error database connection cannot be established");   
    process.exit(STATUSCODE.ONE);
  }
};
