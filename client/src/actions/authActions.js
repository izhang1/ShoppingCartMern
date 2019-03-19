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
    axios.get('/api/auth/user', tokenConfig(getState))
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

// Register the user
export const register = ({ name, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data // Includes token and user
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })

        })

}

// Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Login User
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });

    axios.post('/api/auth/', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // Includes token and user
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })

        })
}

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from local storage
    const token = getState().auth.token; // Looks at the token state in authReducer 

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If the token is available, add it ot the headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}