import { ProductController } from "./controller";
import { Route, Router } from "../../interface";
import { PATH, METHOD, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const userRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.PRODUCTS,
    handler: ProductController.getAllProducts,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.PRODUCT_ID,
    handler: ProductController.getOneProduct,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.PRODUCTS,
    handler: ProductController.AddProduct,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_PRODUCT_ID,
    handler: ProductController.updateProduct,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.PRODUCT_ID,
    handler: ProductController.deleteProduct,
  },
];

userRoutes.forEach((route) => {
  const { method, path, handler } = route;
  router[method as any](path, handler);
});

export default router;
