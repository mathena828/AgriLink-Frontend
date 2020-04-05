import axios from 'axios';

import { returnErrors} from './messages.js';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types.js';

export const loadUser = () => (dispatch, getState) =>{
    //User loading
    dispatch({type: USER_LOADING});

    //Get token from state
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    //if token, add to headers config
    if(token){
        config.headers['Authorization'] = 'Token ${token}';
    }

    axios.get('http://localhost:8000/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload:res.data
            })
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
}

//LOGIN USER
export const login = (username, password) => dispatch=>{
    console.log("hello me login");

    //headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //REquest Body
    const body = JSON.stringify({
        username: username,
        password: password
    });

    axios.post('http://localhost:8000/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload:res.data
            })
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

//LOGOUT USER
/* export const logoutUser = () => (dispatch, getState) =>{


    //Get token from state
    const token = getState().auth.token;

    //headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    //if token, add to headers config
    if(token){
        config.headers['Authorization'] = 'Token ${token}';
    }

    axios.get('http://localhost:8000/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload:res.data
            })
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
}
 */