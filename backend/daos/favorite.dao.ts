import { AppDataSource } from 'orm/dataSource';
import { Favorite } from 'orm/entity/favorite.entity';
import { FindOneOptions, FindOptionsSelect, FindOptionsWhere, ObjectId } from 'typeorm';


/**
 * @author Dias
 * @date 2024/6/20
 * @description Custom functions to manage Favorite Entity.
 */

const favoriteRepository = AppDataSource.getRepository(Favorite)
export const find = async (filter: FindOptionsWhere<Favorite> = {}, select: FindOptionsSelect<Favorite> = {}, relations: string[] = []) => {
    const dbCriteria: FindOneOptions<Favorite>  = {
        where: filter,
        select: select,
        relations: relations,
        order: {'updatedAt': 'DESC'}
    }
    const favorites = await favoriteRepository.find(dbCriteria);
    return favorites
}

export const findOne = async (filter: FindOptionsWhere<Favorite> = {}, select: FindOptionsSelect<Favorite> = {}, relations: string[] = []) => {
    const dbCriteria: FindOneOptions<Favorite>  = {
        where: filter,
        select: select,
        relations: relations
    }
    const favorites = await favoriteRepository.findOne(dbCriteria);
    return favorites
}

export type DeleteFavorite = string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<Favorite>

export const remove = async (favorite: DeleteFavorite) => {
    return await favoriteRepository.delete(favorite);
}

export const save = async (aparment: Favorite) => {
    return await favoriteRepository.save(aparment);
}