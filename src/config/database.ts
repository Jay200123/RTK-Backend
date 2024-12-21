import { mongoose } from "../interface";
import { STATUSCODE } from "../constants";

export const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        process.exit(STATUSCODE.ONE);
    }
}