import { BrandController } from "./controller";
import { Route, Router } from "../../interface";
import { PATH, METHOD, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const userRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.BRANDS,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: BrandController.getAllBrands,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.BRAND_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: BrandController.getOneBrand,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.BRANDS,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: BrandController.AddBrand,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_BRAND_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: BrandController.updateBrand,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.BRAND_ID,
    role: [ROLE.ADMIN],
    middleware: [verifyToken],
    handler: BrandController.deleteBrand,
  },
];

userRoutes.forEach((route) => {
  const { method, path, role = [], middleware = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
