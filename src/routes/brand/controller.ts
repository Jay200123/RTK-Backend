import { Request, Response, NextFunction, Image } from "../../interface";
import { ErrorHandler, SuccessHandler } from "../../utils";
import { BrandService } from "./service";
import { STATUSCODE } from "../../constants";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";

export class BrandController {
  static async getAllBrands(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.getAll();
    return !data || data?.length === STATUSCODE.ZERO
      ?next( new ErrorHandler("No brands records found"))
      : SuccessHandler(res, "brands records found", data);
  }

  static async getOneBrand(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.getById(req.params.id);
    return !data
      ? next(new ErrorHandler("brands not found"))
      : SuccessHandler(res, "brands found", data);
  }

  static async AddBrand(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.Add({
      ...req.body,
    });
    return SuccessHandler(res, "brands created successfully", data);
  }

  static async updateBrand(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.updateById(req.params.id, {
      ...req.body,
    });

    return SuccessHandler(res, "brand record updated", data);
  }

  static async deleteBrand(req: Request, res: Response, next: NextFunction) {
    const data = await BrandService.deleteById(req.params.id);

    return !data
      ? next(new ErrorHandler("No brand record found"))
      : SuccessHandler(res, "brand record deleted successfully", data);
  }
}
