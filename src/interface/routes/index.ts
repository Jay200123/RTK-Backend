import express, { Router, Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middleware";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

type AuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => void;

type Route = {
  method: keyof Router;
  path: string;
  middleware?: AuthMiddleware[];
  role?: string[];
  handler: Middleware;
};

type ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export {
  express,
  Route,
  Router,
  Request,
  Response,
  NextFunction,
  ErrorMiddleware,
};
