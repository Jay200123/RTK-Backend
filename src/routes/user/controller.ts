import { Request, Response, NextFunction, Image } from "../../interface";
import {
  ErrorHandler,
  SuccessHandler,
  validateRequiredFields,
  generateRandomCode,
  sendEmail,
  hashPassword,
} from "../../utils";
import { UserService } from "./service";
import { STATUSCODE } from "../../constants";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";

export class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await UserService.getAll();
    return !data || data?.length === STATUSCODE.ZERO
      ? next(new ErrorHandler("No user records found"))
      : SuccessHandler(res, "User records found", data);
  }

  static async getOneUser(req: Request, res: Response, next: NextFunction) {
    const data = await UserService.getOne(req.params.id);
    return !data
      ? next(new ErrorHandler("User not found"))
      : SuccessHandler(res, "User found", data);
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const validation = validateRequiredFields(req.body, [
      "fullname",
      "contact_number",
      "address",
      "city",
      "email",
    ]);

    if (!validation.isValid) {
      return next(new ErrorHandler(validation.error));
    }

    const user = await UserService.getOne(req.params.id);

    const oldImage = Array?.isArray(user?.image)
      ? user?.image?.map((u) => u?.public_id)
      : [];

    let image: Image[];

    if (Array.isArray(req.files) && req.files.length > 0) {
      image = await uploadImage(req.files as Express.Multer.File[], oldImage);
    } else {
      image = user && Array.isArray(user.image) ? user.image : [];
    }

    const data = await UserService.updateById(req.params.id, {
      ...req.body,
      image: image,
    });

    return SuccessHandler(res, "User record updated", data);
  }
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.getOne(req.params.id);

    const userImage = Array.isArray(user?.image)
      ? user.image.map((i) => i?.public_id)
      : [];

    if (userImage.length > 0) {
      await cloudinary.api.delete_resources(userImage);
    }

    const data = await UserService.deleteById(req.params.id);

    return !data
      ? next(new ErrorHandler("No user record found"))
      : SuccessHandler(res, "user deleted successfully", data);
  }

  static async sendUserOTP(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.getUserByEmail(req.body.email);

    if (!user) {
      return next(new ErrorHandler("User Email not found"));
    }

    if (
      new Date().getTime() -
        new Date(user.verificationCode.createdAt).getTime() <
      5 * 60 * 1000
    ) {
      return next(
        new ErrorHandler(
          "Please wait 5 minutes before requesting a new verification code"
        )
      );
    }

    const code = generateRandomCode();

    const data = await UserService.setCodeByEmail(req.body.email, code);
    await sendEmail(req.body.email, code);

    return SuccessHandler(res, "Verification code sent successfully", data);
  }
  static async updateUserPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const validation = validateRequiredFields(req.body, ["otp", "password"]);

    if (!validation.isValid) {
      return next(new ErrorHandler(validation.error));
    }

    const password = await hashPassword(req.body.password);

    const code = await UserService.getUserByOTP(req.body.otp);

    if (
      Date.now() - new Date(code.verificationCode.createdAt).getTime() >
      5 * 60 * 1000
    ) {
      code.verificationCode = null;
      await code.save();
      return next(new ErrorHandler("OTP expired"));
    }
  

    const data = await UserService.updatePasswordByOTP(req.body.otp, password);

    return !data
      ? next(new ErrorHandler("Invalid OTP"))
      : SuccessHandler(res, "Password updated successfully", data);
  }
}
