import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).json({data:"test2" });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
