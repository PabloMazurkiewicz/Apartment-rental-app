import { AppDataSource } from 'orm/dataSource';
import { User } from 'orm/entity/user.entity';
import { FindManyOptions, FindOneOptions, FindOptionsSelect, FindOptionsWhere, ObjectId } from 'typeorm';

/**
 * @author Dias
 * @date 2024/6/20
 * @description Custom functions to manage User Entity.
 */

const userRepository = AppDataSource.getRepository(User)
export const find = async (filter: FindOptionsWhere<User> = {}, select: FindOptionsSelect<User> = {}) => {
    const dbCriteria: FindManyOptions<User>  = {
        where: filter,
        select: select
    }
    const user = await userRepository.find(dbCriteria);
    return user
}

export const findOne = async (filter: FindOptionsWhere<User> = {}, select: FindOptionsSelect<User> = {}) => {
    const dbCriteria: FindOneOptions<User>  = {
        where: filter,
        select: select
    }
    const user = await userRepository.findOne(dbCriteria);
    return user
}

export type DeleteUser = string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<User>

export const remove = async (user: DeleteUser) => {
    return await userRepository.delete(user);
}

export const save = async (user: User) => {
    return await userRepository.save(user);
}