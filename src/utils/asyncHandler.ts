// import { Request, Response, NextFun } from "./types";
import { Request, Response, NextFunction } from "express";
const asyncHandler =
  (request: (req: Request, res: Response, next: NextFunction) => void) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(request(req, res, next)).catch(next);
  };

export default asyncHandler;
