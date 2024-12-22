import { UserController } from "./controller";
import { Route, Router } from "../../interface";
import { PATH, METHOD, ROLE } from "../../constants";
import { verifyToken, userRole } from "../../middleware";

const router = Router();

const userRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.USERS,
    role: [ROLE.ADMIN],
    middleware: [],
    handler: UserController.getAllUsers,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.USER_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: UserController.getOneUser,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_USER_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: UserController.updateUser,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.USER_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: UserController.deleteUser,
  },
];

userRoutes.forEach((route) => {
  const { method, path, role = [], middleware = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
