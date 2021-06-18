import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.log("In Auth Middleware2");
  //console.log("req.header('Authorization'):", req.header('Authorization'));
  //console.log("Broken", req.cookies['Authorization'] );
  try {
    console.log("Got here");
    //console.log("Broken", req.cookies['Authorization'] );
    //const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
    const Authorization = req.header('Authorization').split('Bearer ')[1] || null;
    //const Authorization =req.header('Authorization').split('Bearer ')[1]
    console.log("Auth", Authorization);

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = userModel.find(user => user.id === userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
