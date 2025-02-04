import { STATUSCODE } from "../../constants";
import { Request, Response, NextFunction } from "../../interface";
import {
  ErrorHandler,
  SuccessHandler,
  validateRequiredFields,
} from "../../utils";
import { ProductService } from "../product/service";
import { OrderService } from "./service";

export class OrderController {
  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.getAll();

    return !data || data.length === STATUSCODE.ZERO
      ? next(new ErrorHandler("No orders found"))
      : SuccessHandler(res, "Orders found", data);
  }

  static async getOneOrder(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.getById(req.params.id);
    return !data
      ? next(new ErrorHandler("Order not found"))
      : SuccessHandler(res, "Order record found", data);
  }

  static async addOrder(req: Request, res: Response, next: NextFunction) {
    const validations = validateRequiredFields(req.body, [
      "user",
      "products",
      "payment",
    ]);

    if (!validations.isValid) {
      return next(new ErrorHandler(validations.error));
    }

    const order = await OrderService.findLastOrder();

    let orderCounter: number = 0;
    let orderNumber: string = "";

    orderCounter = order ? order?.counter + 1 : orderCounter + 1;
    orderNumber = `OR-${orderCounter}`;

    let totalPrice: number = 0;
    for (const products of req.body.products) {
      if (!products.product || !products.quantity) {
        return new ErrorHandler("Product and quantity are required");
      }

      const product = await ProductService.getOne(products.product);
      totalPrice += product.price * products.quantity;
    }

    const totalAmount = totalPrice;

    const data = await OrderService.Add({
      ...req.body,
      counter: orderCounter,
      orderNumber: orderNumber,
      price: totalAmount,
    });

    return SuccessHandler(res, "Order Placed Successfully", data);
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.updateById(req.params.id, {
      ...req.body,
    });
    return !data
      ? new ErrorHandler("Order not found")
      : SuccessHandler(res, "Order updated", data);
  }

  static async orderPacked(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.orderPacked(req.params.id);

    for (const order of data?.products) {
      const product = await ProductService.getOne(order?.product?.toString());
      await ProductService.updateById(order?.product?.toString(), {
        quantity: product?.quantity - order?.quantity,
      });
    }
    return SuccessHandler(res, "Order successfully packed", data);
  }

  static async orderShipped(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.orderShipped(req.params.id);
    return SuccessHandler(res, "Order successfully shipped", data);
  }

  static async orderDelivered(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.orderDelivered(req.params.id);
    return SuccessHandler(res, "Order successfully delivered", data);
  }

  static async orderCancelled(req: Request, res: Response, next: NextFunction) {
    const validation = validateRequiredFields(req.body, ["reason"]);

    if (!validation.isValid) {
      return next(new ErrorHandler(validation.error));
    }
    const data = await OrderService.cancelById(req.params.id, req.body.reason);
    return SuccessHandler(res, "Cancel request submitted successfully", data);
  }

  static async approveCancelOrder(req: Request, res: Response, next: NextFunction){
    const data = await OrderService.approveCancelById(req.params.id); 
    return SuccessHandler(res, "Order cancel approved", data); 
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.deleteById(req.params.id);
    return !data
      ? new ErrorHandler("Order not found")
      : SuccessHandler(res, "Order deleted", data);
  }
}
