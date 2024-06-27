import { AppDataSource } from 'orm/dataSource';
import { Apartment } from 'orm/entity/apartment.entity';
import { FindManyOptions, FindOneOptions, FindOptionsSelect, FindOptionsWhere, ObjectId } from 'typeorm';

/**
 * @author Dias
 * @date 2024/6/20
 * @description Custom functions to manage Apartment Entity.
 */
const apartmentRepository = AppDataSource.getRepository(Apartment)
export const find = async (filter: FindOptionsWhere<Apartment> = {}, select: FindOptionsSelect<Apartment> = {}, relations: string[] = [], skip: number = 0, take: number = 0) => {
    const dbCriteria: FindManyOptions<Apartment>  = {
        where: filter,
        select: select,
        relations: relations,
        skip: skip,
        take: take,
        order: {'updatedAt': 'DESC'}
    }
    const apartments = await apartmentRepository.find(dbCriteria);
    return apartments
}

export const getTotal = async (filter: FindOptionsWhere<Apartment> = {}, select: FindOptionsSelect<Apartment> = {}, relations: string[] = []) => {
    const dbCriteria: FindManyOptions<Apartment>  = {
        where: filter,
        select: select,
        relations: relations
    }
    const apartments = await apartmentRepository.find(dbCriteria);
    return apartments.length
}

export const findOne = async (filter: FindOptionsWhere<Apartment> = {}, select: FindOptionsSelect<Apartment> = {}, relations: string[] = []) => {
    const dbCriteria: FindOneOptions<Apartment>  = {
        where: filter,
        select: select,
        relations: relations
    }
    const apartments = await apartmentRepository.findOne(dbCriteria);
    return apartments
}

export type DeleteApartment = string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<Apartment>

export const remove = async (apartment: DeleteApartment) => {
    return await apartmentRepository.delete(apartment);
}

export const save = async (aparment: Apartment) => {
    return await apartmentRepository.save(aparment);
}