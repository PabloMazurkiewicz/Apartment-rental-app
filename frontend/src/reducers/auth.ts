import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/types";

// Define the shape of the user object if known, otherwise use 'any'
interface User {
    id: number;
    role: string;
    email: string
}

// Define the shape of the state
interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

// Define the shape of the action
interface Action {
    type: string;
    payload?: {
        user: User;
    };
}

// Retrieve the user from localStorage
const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

// Define the initial state
const initialState: AuthState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

// The reducer function
export default function authReducer(
    state: AuthState = initialState,
    action: Action
): AuthState {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload?.user || null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}