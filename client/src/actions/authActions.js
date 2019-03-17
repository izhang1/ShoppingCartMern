import axios from 'axios';
import { returnErrors }from './errorActions';
import {
    USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR,
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT_SUCCESS, 
    REGISTER_FAIL, 
    REGISTER_SUCCESS
 } from './types';

 // Check token and auth user
export const loadUser = () => (dispatch, getState) => {
    axios.get('/api/auth/user', tokenConfig(dispatch, getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data // should contain the user and token object
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });
} 

// Setup config/headers and token
export const tokenConfig = (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });

    // Get token from local storage
    const token = getState().auth.token; // Looks at the token state in authReducer 

    // Headers
    const config = {
        headers: {
            "Content-Type": "applucation/json"
        }
    }

    // If the token is available, add it ot the headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}