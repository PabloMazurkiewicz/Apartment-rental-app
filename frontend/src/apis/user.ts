import axios from "axios";
import constants from "../utils/constants";

import AuthRequest from "../utils/request"

const USER_API_URL = `${constants.API_BASE_URL}user`;


// Define the shape of the response data
interface UserResponse {
    data: any
}

/**
 * @author Dias
 * @date 2024/6/20
 * @param searchData 
 * @returns All available property list
 */
const getProperties = (searchData: any) => {

    return AuthRequest.post<UserResponse>(`${USER_API_URL}/`, searchData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param id 
 * @returns One Property details data
 */
const getOne = (id: string) => {

    return AuthRequest.get<UserResponse>(`${USER_API_URL}/${id}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param id 
 * @description Add Apartment to the Favorites
 */
const addFavo = (id: string) => {

    return AuthRequest.post<UserResponse>(`${USER_API_URL}/favorites/add`, {apartmentId: id})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param id 
 * @description Remove Apartment from Favorites
 */
const removeFavo = (id: string) => {

    return AuthRequest.post<UserResponse>(`${USER_API_URL}/favorites/delete`, {favoId: id})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
};


/**
 * @author Dias
 * @date 2024/6/20
 * @returns All favorites apartments
 */
const getFavorites = () => {

    return AuthRequest.get<UserResponse>(`${USER_API_URL}/favorites/get`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
};


export default {
    getProperties,
    getOne,
    addFavo,
    getFavorites,
    removeFavo
};