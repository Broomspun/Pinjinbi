import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage} from 'react-native'
import Timer from 'react-timer-mixin';

import {
    LOGIN_PARAMETER_UPDATED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPTING,
    HOME_LOADING, CHANGE_LOGIN_PASSWORD_SUCCESS
} from "./types";
import {getMemberInfo} from "../Services";

export const loginParameterUpdated = ({ prop, value }) => {
    return {
        type: LOGIN_PARAMETER_UPDATED,
        payload: {prop, value}
    }
};

export const _storeUserAuthenticationData = async (user) => {
    try {
        await AsyncStorage.setItem('pjinbi_auth_user', JSON.stringify(user));
    } catch (error) {
        console.log('error',error);
    }
};

export const loginUser = ({phone, password}) => {
    return (dispatch) => {
        dispatch ({type: LOGIN_USER_ATTEMPTING});//For Spinner

        let instance = axios.create({
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        });
        instance.post('http://pjbapi.wtvxin.com/api/Login/LoginByMobile',
            `Mobile=${phone}&PassWord=${password}`
        )
            .then(user =>{
                if(user.data.errcode ===0) {
                    loginUserSuccess(dispatch, user.data.obj, user.data.msg)
                } else {
                    loginUserFail(dispatch, user.data.msg);
                }
            })
            .catch(() =>  loginUserFail(dispatch, 'Failed'));
    };
};

const loginUserFail = (dispatch, msg)=>{
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: msg
    })
};

const loginUserSuccess = async (dispatch, user, msg) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {user: user, msg: msg}
    });

    await _storeUserAuthenticationData(user);

    if(user) {
        Timer.setTimeout(() => {
            Actions.main({user: user});
        }, 500);
    }
};

export const homeLoading = (UserId, Token, user)=> {
    return (dispatch) =>{
        (async ()=>{
            let memberInfo = await getMemberInfo(UserId, Token);
            if(memberInfo.status===200) {
                dispatch({
                    type: HOME_LOADING,
                    payload: {...memberInfo.data, ...user}
                });
            }
        })();
    }
};
