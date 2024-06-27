import { Request, Response, NextFunction } from 'express';
import { UserToken } from 'orm/entity/userToken.entity';
import * as userDao from 'daos/user.dao'
import * as userTokenDao from 'daos/userToken.dao'

import '@/types/express';

import { User } from '../orm/entity/user.entity';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtRefreshToken, createJwtToken } from 'utils/createJwtToken';
import ApiError from 'utils/response/customError/customError';
import { Role } from 'orm/types/user.types';


/**
 * @author Dias
 * @date 2024/6/20
 * @param req 
 * @param res 
 * @param next 
 * @returns Success Message
 * @description User Register Function
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;

  try {
    const user = await userDao.findOne( { email } );

    if (user) {
      const customError = new ApiError(400, 'Raw', 'ERROR', null, `Email '${user.email}' already exists`);

      return next(customError);
    }

    try {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.role = role;
      newUser.hashPassword();
      
      await userDao.save(newUser);

      res.customSuccess(200, 'User successfully created.');
    } catch (err) {
      const customError = new ApiError(400, 'Raw', 'ERROR', null, `User '${email}' can't be created`);
      return next(customError);
    }
  } catch (err) {
    const customError = new ApiError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param req 
 * @param res 
 * @param next 
 * @returns user auth data
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await userDao.findOne({email});
    if (!user) {
      const customError = new ApiError(400, 'Raw', 'Error', ['Incorrect email or password']);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new ApiError(400, 'Raw', 'Error', ['Incorrect email or password']);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      created_at: user.createdAt,
    };

    try {
      const { token: accessToken, expiresIn: accessTokenExpiration } = createJwtToken(jwtPayload);
      const { token: refreshToken, expiresIn: refreshTokenExpiration } = createJwtRefreshToken(jwtPayload);

      const {password, ...rest} = user.toJSON()


      const data = {
        ...rest,
        accessToken: `Bearer ${accessToken}`,
        expiresIn: accessTokenExpiration,
        refreshToken: refreshToken,
      };

      const oldUserToken = await userTokenDao.findOne({ userId: user.id  });

      if (oldUserToken) {
        // have signed in before
        oldUserToken.refreshToken = refreshToken;
        await userTokenDao.save(oldUserToken);
      } else {
        // first time user sign in
        const newUserToken = new UserToken();
        newUserToken.user = user;
        newUserToken.refreshToken = refreshToken;
        await userTokenDao.save(newUserToken);
      }

      res.customSuccess(200, 'Token successfully created.', data);

    } catch (err) {
      const customError = new ApiError(400, 'Raw', "ERROR", null, "Token can't be created.");
      return next(customError);
    }
  } catch (err) {
    const customError = new ApiError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

