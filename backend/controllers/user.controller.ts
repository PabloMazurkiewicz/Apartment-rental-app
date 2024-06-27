import { Request, Response, NextFunction } from 'express';
import { User } from '@/orm/entity/user.entity';
import { Apartment } from 'orm/entity/apartment.entity';
import * as apartmentDao from 'daos/apartment.dao'
import * as userDao from 'daos/user.dao'
import * as favoriteDao from 'daos/favorite.dao'

import '@/types/express';

import ApiError from 'utils/response/customError/customError';
import { FindOptionsWhere, Between, Like } from 'typeorm';
import { Favorite } from '@/orm/entity/favorite.entity';


/**
 * @author Dias
 * @date 2024/6/20
 * @param req 
 * @param res 
 * @param next 
 * @returns Available properties List
 */
export const getList = async (req: Request, res: Response, next: NextFunction) => {
  const { size, price, search, current, pageSize } = req.body;

  try {
    const filter: FindOptionsWhere<Apartment> = {};

    if (search !== '') {
      filter.title = Like(`%${search}%`);
    }

    // Add additional filters as needed
    if (price && price[0] !== 0 && price[1] !== 0) {
      filter.price = Between(price[0], price[1]);
    }

    if (size && size[0] !== 0 && size[1] !== 0) {
      filter.areaSize = Between(size[0], size[1]);
    }

    const skip = (current - 1) * pageSize;
    const take = pageSize;

    const apartments = await apartmentDao.find(filter, {}, [], skip, take);

    const total = await apartmentDao.getTotal(filter, {}, []);

    res.customSuccess(200, 'List of properties.', {apartments, total});

  } catch (err) {
    const customError = new ApiError(400, 'Raw', `Can't retrieve list of properties.`, null, err);
    return next(customError);
  }
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param req 
 * @param res 
 * @param next 
 * @returns One property's details
 */
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const apartment = await apartmentDao.findOne(
      { id: id },
      {
        id: true,
        title: true,
        description: true,
        areaSize: true,
        roomNo: true,
        price: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      ['user']
    );

    if (!apartment) {
      const customError = new ApiError(400, 'Raw', 'ERROR', null, `Apartment with id:${id} not found.`);
      return next(customError);
    }

    res.customSuccess(200, 'Apartment found', apartment);

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
 * @returns Regular user's favorites list
 */
export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;

  try {
    const favorites = await favoriteDao.find(
      { userId: id },
      {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
      ['apartment']
    );

    res.customSuccess(200, 'Apartment found', favorites);

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
 * @returns Save Success message
 */
export const addFavo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const { apartmentId } = req.body;

  try {
    const already = await favoriteDao.findOne({ userId : id, apartmentId: apartmentId });

    if (already) {
      const customError = new ApiError(400, 'Raw', 'ERROR', null, `You already save this property to your favorites.`);
      return next(customError);
    }

    const newFavo = new Favorite();
    newFavo.userId = id;
    newFavo.apartmentId = apartmentId

    try {
      await favoriteDao.save(newFavo);
      res.customSuccess(200, 'Property successfully stored to favorites.');

    } catch (err) {
      const customError = new ApiError(400, 'Raw', 'ERROR', null, err);
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
 * @returns removed favorite item id and user
 */
export const deleteFavo = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.favoId;

  try {
    const favorite = await favoriteDao.findOne({ id: id } );

    if (!favorite) {
      const customError = new ApiError(400, 'Raw', "ERROR", null, `Favorite property with id:${id} doesn't exists.`);
      return next(customError);
    }

    favoriteDao.remove(id);

    res.customSuccess(200, 'Favorite property successfully deleted.', { id: favorite.id, user: favorite.userId });

  } catch (err) {
    const customError = new ApiError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
