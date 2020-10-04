import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getUserList_ = (users) => {
    return { type: actionTypes.GET_USER_LIST, users: users };
};

export const getUserList = () => {
    return dispatch => {
        return axios.get('/api/user/')
        .then(res => dispatch(getUserList_(res.data)));
    };
};

export const getUser_ = (user) => {
    return { type: actionTypes.GET_USER, target: user };
};

export const getUser = () => {
    return dispatch => {
        return axios.get('/api/user/1/')
        .then(res => {
            dispatch(getUser_(res.data))
        });
    };
};

export const updateLoginStatus_ = (user) => {
    return { type: actionTypes.UPDATE_LOGIN_STATUS, targetID: user.id};
};

export const updateLoginStatus = (user) => {
    return dispatch => {
        return axios.put('/api/user/1/',  {...user, logged_in : !user.logged_in})
        .then(res => {
            dispatch(updateLoginStatus_(res.data))
        });
    };
};