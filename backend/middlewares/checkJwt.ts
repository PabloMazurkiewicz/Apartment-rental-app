import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';
import  ApiError  from 'utils/response/customError/customError';


/**
 * @author Dias
 * @param req 
 * @param res 
 * @param next 
 * @description Request Authorization Header Check.
 */
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new ApiError(400, 'Raw', 'Authorization header not provided');
    return next(customError);
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.user = jwtPayload as JwtPayload;
    next();
  } catch (err) {
    const customError = new ApiError(401, 'Raw', 'JWT error', null, err);
    return next(customError);
  }

};
