import { Request, Response, NextFunction } from 'express';
import { Apartment } from 'orm/entity/apartment.entity';
import * as apartmentDao from 'daos/apartment.dao'
import * as userDao from 'daos/user.dao'

import ApiError from 'utils/response/customError/customError';
import { FindOptionsWhere, Like } from 'typeorm';


/**
 * @author Dias
 * @date 2024/6/20
 * @param req 
 * @param res 
 * @param next 
 * @returns Apartment List
 * @description Get Own Apartments
 */
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user.id;
  const { search } = req.body;
  
  try {
    const filter: FindOptionsWhere<Apartment> = {userId: userId};

    if (search !== '') {
      filter.title = Like(`%${search}%`);
    }

    const apartments = await apartmentDao.find(filter, {}, []);

    res.customSuccess(200, 'Apartment List', apartments);

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
 * @returns One Apartment Data
 * @description Get Apartment Data using id parameter
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
        updatedAt: true
      },
      []
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
 * @param req 
 * @param res 
 * @param next 
 * @returns Success Message
 * @description Save new Apartment Information & Update existing Apartment Infos.
 */
export const addOne = async (req: any, res: Response, next: NextFunction) => {
  const { title, description, size, roomNo, price, apartmentId, noImage } = req.body;
  const file = req.file;

  const {id} = req.user;

  try {
    const user = await userDao.findOne({id});

    if (!user) {
      const userError = new ApiError(400, 'Raw', 'Error', null, 'User not found.');
      return next(userError)
    }

    if(apartmentId) {
      const apartment = await apartmentDao.findOne({ id: apartmentId });

      if (!apartment) {
        const customError = new ApiError(400, 'Raw', `ERROR`, null, `Apartment '${apartmentId}' not found.`);
        return next(customError);
      }

      apartment.title = title;
      apartment.description = description;
      apartment.areaSize = size;
      apartment.roomNo = roomNo;
      apartment.price = price;
      if(apartment.image != '') {
        if(noImage) {
          apartment.image = '';
        }
      } else {
        apartment.image = !file ? '' : noImage ? '' : file?.filename;
      }


      try {
        await apartmentDao.save(apartment);
        res.customSuccess(200, 'Apartment successfully updated.');

      } catch (err) {
        const customError = new ApiError(400, 'Raw', 'ERROR', null, `Apartment '${apartmentId}' can't be saved.`);
        return next(customError);
      }

    } else {
      const newApartment = new Apartment();
      newApartment.title = title;
      newApartment.description = description;
      newApartment.areaSize = size;
      newApartment.roomNo = roomNo;
      newApartment.price = price;
      newApartment.image = !file ? '' : file?.filename;
      newApartment.userId = user.id;
      await apartmentDao.save(newApartment);
  
      res.customSuccess(200, 'Apartment successfully created.');
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
 * @returns Deleted apartment id and title
 * @description Delete Apartment using id
 */
export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;

  try {
    const apartment = await apartmentDao.findOne({ id });

    if (!apartment) {
      const customError = new ApiError(400, 'Raw', 'ERROR', null, `Apartment with id:${id} doesn't exists.`);
      return next(customError);
    }

    apartmentDao.remove(id);

    res.customSuccess(200, 'Apartment successfully deleted.', { id: apartment.id, title: apartment.title });

  } catch (err) {
    const customError = new ApiError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

