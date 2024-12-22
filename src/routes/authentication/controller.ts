import { UserService } from "../user/service";
import { Request, Response, NextFunction, mongoose } from "../../interface";
import {
  ErrorHandler,
  SuccessHandler,
  uploadImage,
  hashPassword,
} from "../../utils";
import bcrypt from "bcrypt";
import { generateToken, generateBlacklist } from "../../middleware";

export class AuthenticationController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.getOnEmail(req.body.email);

    if (user) {
      return next(new ErrorHandler("Email already exists"));
    }

    const password = await hashPassword(req.body.password);
    const image = await uploadImage(req.files as Express.Multer.File[], []);

    const data = await UserService.Add({
      ...req.body,
      password: password,
      image: image,
    });
    return SuccessHandler(res, "User created", data);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const data = await UserService.getOnEmail(req.body.email);

    if (!data) {
      return next(new ErrorHandler("Account not found"));
    }

    const isMatch = await bcrypt.compare(req.body.password, data?.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid password"));
    }

    const token = generateToken({ _id: data?._id as mongoose.Types.ObjectId });

    return SuccessHandler(res, "Login successful", data, token);
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"].split(" ")[1];

    if (token) {
      await generateBlacklist(token);
    }

    return SuccessHandler(res, "Logout Success", []);
  }
}
