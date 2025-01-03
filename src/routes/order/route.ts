import { Route, Router } from "../../interface";
import { OrderController } from "./controller";
import { verifyToken, userRole } from "../../middleware";
import { METHOD, PATH, ROLE } from "../../constants";

const router = Router();

const orderRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.ORDERS,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: OrderController.getAllOrders,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.ORDER_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: OrderController.getOneOrder,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.ORDERS,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: OrderController.addOrder,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_ORDER_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: OrderController.updateOrder,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.ORDER_PACKED,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: OrderController.orderPacked,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.ORDER_SHIPPED,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: OrderController.orderShipped,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.ORDER_DELIVERED,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: OrderController.orderDelivered,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.ORDER_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: OrderController.deleteOrder,
  },
];

orderRoutes.forEach((route) => {
  const { method, path, handler, role = [], middleware = [] } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
