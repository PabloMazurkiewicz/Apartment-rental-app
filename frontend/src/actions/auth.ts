import {
    LOGIN_SUCCESS,
    LOGOUT,
} from "./types";

import AuthAPI from "../apis/auth";
import constants from "../utils/constants";

// Define the Dispatch type
type Dispatch = (action: { type: string; payload?: any }) => void;


/**
 * @author Dias
 * @date 2024/6/20
 * @param email 
 * @param password 
 * @description User Login Action Function
 */
export const login = (email: string, password: string) => (dispatch: Dispatch): Promise<void> => {
    return AuthAPI.login(email, password).then(
        (response: any) => {
            if(response.status == constants.SUCCESS_REQUEST_STATUS) {
                console.log("Here!!!")
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: response.data.data },
                });
            }   

            return response.data;
        }
    );
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param email 
 * @param password 
 * @param role 
 * @description User SignUp Action Function
 */
export const signup = (email: string, password: string, role: string) => (dispatch: Dispatch): Promise<void> => {
    return AuthAPI.signup(email, password, role).then(
        (response: any) => {
            console.log(response);

            return Promise.resolve();
        },
    );
};


/**
 * @author Dias
 * @date 2024/6/20
 * @description User Logout Action Function, Remove LocalStorage Item.
 */
export const logout = () => (dispatch: Dispatch): Promise<void> => {
    dispatch({
        type: LOGOUT,
    });
    
    localStorage.removeItem("user");

    return Promise.resolve();
};