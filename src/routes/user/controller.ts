import { Request, Response, NextFunction, Image } from "../../interface";
import { ErrorHandler, SuccessHandler } from "../../utils";
import { UserService } from "./service";
import { STATUSCODE } from "../../constants";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";

export class UserController {
  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const data = await UserService.getAll();
    return !data || data?.length === STATUSCODE.ZERO
      ? new ErrorHandler("No user records found")
      : SuccessHandler(res, "User records found", data);
  }

  static async getOneUser(req: Request, res: Response, next: NextFunction) {
    const data = await UserService.getOne(req.params.id);
    return !data
      ? new ErrorHandler("User not found")
      : SuccessHandler(res, "User found", data);
  }

  static async AddUser(req: Request, res: Response, next: NextFunction) {
    const image = await uploadImage(req.files as Express.Multer.File[], []);
    const data = await UserService.Add({
      ...req.body,
      image: image,
    });
    return SuccessHandler(res, "User created", data);
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
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
}
