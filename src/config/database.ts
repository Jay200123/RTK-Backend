import { mongoose } from "../interface";
import { STATUSCODE } from "../constants";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const dbUri = process.env.DATABASE_URI;
    if (!dbUri) {
      throw new Error("DATABASE_URI is not defined");
    }
    await mongoose.connect(dbUri);
  } catch (err) {
    console.log(err);
    console.log("Error database connection cannot be established");   
    process.exit(STATUSCODE.ONE);
  }
};
