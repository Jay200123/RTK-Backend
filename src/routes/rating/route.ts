import { RatingController } from "./controller";
import { Route, Router } from "../../interface";
import { verifyToken, userRole } from "../../middleware";
import { METHOD, ROLE, PATH } from "../../constants";

const router = Router();

const ratingRoutes: Route[] = [
  {
    method: METHOD.GET as keyof Router,
    path: PATH.RATINGS,
    role: [],
    middleware: [],
    handler: RatingController.getAllRatings,
  },
  {
    method: METHOD.GET as keyof Router,
    path: PATH.RATING_ID,
    role: [],
    middleware: [],
    handler: RatingController.getOneRating,
  },
  {
    method: METHOD.POST as keyof Router,
    path: PATH.RATINGS,
    role: [ROLE.USER],
    middleware: [verifyToken],
    handler: RatingController.AddRating,
  },
  {
    method: METHOD.PATCH as keyof Router,
    path: PATH.EDIT_RATING_ID,
    role: [ROLE.USER],
    middleware: [verifyToken],
    handler: RatingController.updateRatingById,
  },
  {
    method: METHOD.DELETE as keyof Router,
    path: PATH.RATING_ID,
    role: [ROLE.ADMIN, ROLE.USER],
    middleware: [verifyToken],
    handler: RatingController.deleteRatingById,
  },
];

ratingRoutes.forEach((route) => {
  const { method, path, role = [], middleware = [], handler } = route;
  router[method as any](path, middleware.concat(userRole(...role)), handler);
});

export default router;
