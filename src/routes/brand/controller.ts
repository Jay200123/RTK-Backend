import { Request, Response, NextFunction, Image } from "../../interface";
import {
  ErrorHandler,
  SuccessHandler,
  validateRequiredFields,
} from "../../utils";
import { BrandService } from "./service";
import { STATUSCODE } from "../../constants";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";

export class BrandController {
  static async getAllBrands(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.getAll();
    return !data || data?.length === STATUSCODE.ZERO
      ? next(new ErrorHandler("No brands records found"))
      : SuccessHandler(res, "brands records found", data);
  }

  static async getOneBrand(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.getById(req.params.id);
    return !data
      ? next(new ErrorHandler("brands not found"))
      : SuccessHandler(res, "brands found", data);
  }

  static async AddBrand(req: Request, res: Response, next: NextFunction) {
    const validation = validateRequiredFields(req.body, ["brand_name"]);
    if (!validation.isValid) {
      return next(new ErrorHandler(validation.error));
    }

    const image = await uploadImage(req.files as Express.Multer.File[], []);
    const data = await BrandService.Add({
      ...req.body,
      image: image,
    });
    return SuccessHandler(res, "brands created successfully", data);
  }

  static async updateBrand(req: Request, res: Response, next: NextFunction) {
    const brand = await BrandService.getById(req.params.id);

    const validation = validateRequiredFields(req.body, ["brand_name"]);
    if (!validation.isValid) {
      return next(new ErrorHandler(validation.error));
    }

    const oldImage = Array?.isArray(brand?.image)
      ? brand?.image?.map((b) => b?.public_id)
      : [];

    let image: Image[];

    if (Array.isArray(req.files) && req.files.length > 0) {
      image = await uploadImage(req.files as Express.Multer.File[], oldImage);
    } else {
      image = brand && Array.isArray(brand.image) ? brand.image : [];
    }

    const data = await BrandService.updateById(req.params.id, {
      ...req.body,
      image: image,
    });

    return SuccessHandler(res, "brand record updated", data);
  }

  static async deleteBrand(req: Request, res: Response, next: NextFunction) {
    const brand = await BrandService.getById(req.params.id);

    const brandImage = Array?.isArray(brand?.image)
      ? brand?.image?.map((b) => b?.public_id)
      : [];
    if (brandImage.length > 0) {
      await cloudinary.api.delete_resources(brandImage);
    }

    const data = await BrandService.deleteById(req.params.id);

    return !data
      ? next(new ErrorHandler("No brand record found"))
      : SuccessHandler(res, "brand record deleted successfully", data);
  }
}
