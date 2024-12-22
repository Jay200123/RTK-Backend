import { Request, Response, NextFunction, Image } from "../../interface";
import { ErrorHandler, SuccessHandler } from "../../utils";
import { ProductService } from "./service";
import { STATUSCODE } from "../../constants";
import { uploadImage } from "../../utils";
import { cloudinary } from "../../config";

export class ProductController {
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const data = await ProductService.getAll();
    return !data || data?.length === STATUSCODE.ZERO
      ? new ErrorHandler("No Product records found")
      : SuccessHandler(res, "Product records found", data);
  }

  static async getOneProduct(req: Request, res: Response, next: NextFunction) {
    const data = await ProductService.getOne(req.params.id);
    return !data
      ? new ErrorHandler("Product not found")
      : SuccessHandler(res, "Product found", data);
  }

  static async AddProduct(req: Request, res: Response, next: NextFunction) {
    const image = await uploadImage(req.files as Express.Multer.File[], []);
    const quantity = Number(req.body.quantity);
    const data = await ProductService.Add({
      ...req.body,
      quantity: quantity,
      image: image,
    });
    return SuccessHandler(res, "Product created successfully", data);
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    const product = await ProductService.getOne(req.params.id);

    const oldImage = Array?.isArray(product?.image)
      ? product?.image?.map((i) => i?.public_id)
      : [];

    let image: Image[];

    image = await uploadImage(req.files as Express.Multer.File[], oldImage);

    const data = await ProductService.updateById(req.params.id, {
      ...req.body,
      image: image,
    });

    return SuccessHandler(res, "product record updated", data);
  }
  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const product = await ProductService.getOne(req.params.id);

    const productImage = Array.isArray(product?.image)
      ? product.image.map((i) => i?.public_id)
      : [];

    if (productImage.length > 0) {
      await cloudinary.api.delete_resources(productImage);
    }

    const data = await ProductService.deleteById(req.params.id);

    return !data
      ? next(new ErrorHandler("No product record found"))
      : SuccessHandler(res, "product deleted successfully", data);
  }
}
