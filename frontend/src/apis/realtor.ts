import axios from "axios";
import constants from "../utils/constants";

import AuthRequest from "../utils/request"

const REALTOR_API_URL = `${constants.API_BASE_URL}realtor`;


// Define the shape of the response data
interface RealtorResponse {
    data: any
}

/**
 * @author Dias
 * @date 2024/6/20
 * @param data 
 * @returns Apartment List
 */
const getApartments = (data: any) => {

    return AuthRequest.post<RealtorResponse>(`${REALTOR_API_URL}/`, data)
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
 * @returns One Apartment Details
 */
const getOne = (id: string) => {

    return AuthRequest.get<RealtorResponse>(`${REALTOR_API_URL}/${id}`)
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
 * @param data 
 * @description Add New Apartment information along with uploading of preview image file.
 */
const addApartment = (data: any) => {

    return AuthRequest.post<RealtorResponse>(`${REALTOR_API_URL}/add`, data, {headers: {'Content-Type': 'multipart/form-data'}})
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
 * @description Remove Apartment using id
 */
const removeApartment = (id: string) => {

    return AuthRequest.post<RealtorResponse>(`${REALTOR_API_URL}/delete`, {id: id})
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
};


export default {
    getApartments,
    getOne,
    addApartment,
    removeApartment
};