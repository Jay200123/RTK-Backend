import { connectDB, globalEnvironment } from "./src/config";
import { express, mongoose } from "./src/interface";
import { upload } from "./src/utils";
import { authentication, user, product } from "./src/routes";
import { errorJson, errorHandler } from "./src/middleware";
import cookieParser from "cookie-parser";

connectDB();
globalEnvironment();

const app = express();

app.use(upload.array("image"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = { message: "Express server is running" };
  res.json(data);
});

app.use("/api/v1", authentication, user, product);

app.get("*", (req, res) => {
  const data = { message: "Route not found" };
  res.json(data);
});

app.use(errorJson);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(process.env.PORT);
  console.log(`Mongoose Database connected`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  process.exit(1);
});
