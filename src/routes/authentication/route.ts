import { AuthenticationController } from "./controller";
import { Route, Router } from "../../interface";
import { METHOD, PATH } from "../../constants";

const router = Router();

const authenticationRoutes: Route[] = [
  {
    method: METHOD.POST as keyof Router,
    path: PATH.USERS,
    handler: AuthenticationController.register,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.LOGIN,
    handler: AuthenticationController.login,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.LOGOUT,
    handler: AuthenticationController.logout,
  },
];

authenticationRoutes.forEach((route) => {
  const { method, path, handler } = route;
  router[method as any](path, handler);
});

export default router;
