import axios from "axios";
import constants from "../utils/constants";

const AUTH_API_URL = `${constants.API_BASE_URL}auth`;

// Define the shape of the response data
interface AuthResponse {
    token?: string;
    data: any
}

// Define the shape of the signup data
interface SignUpData {
    email: string;
    password: string;
    role: string
}

// Define the shape of the login data
interface LoginData {
    email: string;
    password: string;
}

/**
 * @author Dias
 * @date 2024/6/20
 * @param email 
 * @param password 
 * @param role 
 * @description SignUp Restful API function.
 */
const signup = (email: string, password: string, role: string) => {
    const data: SignUpData = { email, password, role };
    return axios.post<AuthResponse>(`${AUTH_API_URL}/signup`, data);
};


/**
 * @author Dias
 * @date 2024/6/20
 * @param email 
 * @param password 
 * @description Login Restful API function.
 */
const login = (email: string, password: string): Promise<any> => {
    const data: LoginData = { email, password };
    
    return axios.post<any>(`${AUTH_API_URL}/login`, data)
        .then((response) => {
            console.log(response.data)
            if (response.data.data) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }

            return response;
        })
        .catch((err) => {
            return err.response;
        })
};


export default {
    signup,
    login
};