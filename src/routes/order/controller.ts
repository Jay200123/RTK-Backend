import { STATUSCODE } from "../../constants";
import { Request, Response, NextFunction } from "../../interface";
import { ErrorHandler, SuccessHandler } from "../../utils";
import { OrderService } from "./service";

export class OrderController {
  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.getAll();

    return !data || data.length === STATUSCODE.ZERO
      ? new ErrorHandler("No orders found")
      : SuccessHandler(res, "Orders found", data);
  }

  static getOneOrder(req: Request, res: Response, next: NextFunction) {
    const data = OrderService.getById(req.params.id);
    return !data
      ? new ErrorHandler("Order not found")
      : SuccessHandler(res, "Order record found", data);
  }

  static async addOrder(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.Add({
      ...req.body,
    });
    return SuccessHandler(res, "Order added", data);
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.updateById(req.params.id, {
      ...req.body,
    });
    return !data
      ? new ErrorHandler("Order not found")
      : SuccessHandler(res, "Order updated", data);
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const data = await OrderService.deleteById(req.params.id);
    return !data
      ? new ErrorHandler("Order not found")
      : SuccessHandler(res, "Order deleted", data);
  }
}
