import { ProductController } from "./controller";
import { Route, Router } from "../../interface";
import { PATH, METHOD, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const userRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.PRODUCTS,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: ProductController.getAllProducts,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.PRODUCT_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: ProductController.getOneProduct,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.PRODUCTS,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: ProductController.AddProduct,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_PRODUCT_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: ProductController.updateProduct,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.PRODUCT_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: ProductController.deleteProduct,
  },
];

userRoutes.forEach((route) => {
  const { method, path, role = [], middleware = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
