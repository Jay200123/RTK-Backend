import { RatingService } from "./service";
import { Request, Response, NextFunction } from "../../interface";
import { ErrorHandler, SuccessHandler, uploadImage } from "../../utils";
import { cloudinary } from "../../config";
import { STATUSCODE } from "../../constants";
import { Image } from "../../interface";

export class RatingController {
  static async getAllRatings(req: Request, res: Response, next: NextFunction) {
    const data = await RatingService.getAll();
    return !data || data?.length === STATUSCODE.ZERO
      ? next(new ErrorHandler("No Rating records found"))
      : SuccessHandler(res, "Rating records found", data);
  }

  static async getOneRating(req: Request, res: Response, next: NextFunction) {
    const data = await RatingService.getById(req.params.id);
    return !data
      ? next(new ErrorHandler("Rating not found"))
      : SuccessHandler(res, "Rating found", data);
  }

  static async AddRating(req: Request, res: Response, next: NextFunction) {
    const image = await uploadImage(req.files as Express.Multer.File[], []);
    const rating = Number(req.body.rating);
    const data = await RatingService.Add({
      ...req.body,
      rating: rating,
      image: image,
    });
    return SuccessHandler(res, "Rating created successfully", data);
  }

  static async updateRatingById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const rating = await RatingService.getById(req.params.id);

    const oldImage = Array?.isArray(rating?.image)
      ? rating?.image?.map((u) => u?.public_id)
      : [];

    let image: Image[];

    if (Array.isArray(req.files) && req.files.length > 0) {
      image = await uploadImage(req.files as Express.Multer.File[], oldImage);
    } else {
      image = rating && Array.isArray(rating.image) ? rating.image : [];
    }

    const data = await RatingService.updateById(req.params.id, {
      ...req.body,
      rating: Number(req.body.rating),
      image: image,
    });

    return SuccessHandler(res, "rating record updated", data);
  }

  static async deleteRatingById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const rating = await RatingService.getById(req.params.id);

    const ratingImage = Array.isArray(rating.image)
      ? rating.image.map((i) => i?.public_id)
      : [];

    if (ratingImage.length > 0) {
      await cloudinary.api.delete_resources(ratingImage);
    }

    const data = await RatingService.deleteById(req.params.id);

    return !data
      ? next(new ErrorHandler("Rating not found"))
      : SuccessHandler(res, "Rating record deleted", data);
  }
}
