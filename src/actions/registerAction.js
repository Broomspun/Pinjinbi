import axios from "axios";
import {Actions} from 'react-native-router-flux';
import {generatorCaptchaCode} from "../Helper";

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_PARAMETER_UPDATED,
    REGISTER_REGENERATE_CAPTCHACODE,
    REGISTER_VERIFY,
    REGISTER_VERIFY_FAIL,
    REGISTER_VERIFY_SUCCESS,
} from './types'

const rinstance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
});
export const registerParameterUpdated = ( {prop, value}) => {
  return {
      type: REGISTER_PARAMETER_UPDATED,
      payload: {prop, value}
  }
};

export const generateCaptchaCode_register = () => {
    return {
        type: REGISTER_REGENERATE_CAPTCHACODE,
        payload: {value: generatorCaptchaCode(4)}
    }
};


export const requestVerifyCode_register = ({rg_phone,  rg_captcha_match}) =>{
    return (dispatch) =>{

        dispatch({type: REGISTER_VERIFY}); //for Spinner;

        rinstance.post('http://pjbapi.wtvxin.com/api/Login/GetUserSms',
            `Mobile=${rg_phone}&VerifyType=${rg_captcha_match}`)
            .then (res=> {
                console.log(res);
                console.log(res.data.errcode);
                if(res.data.errcode===0){
                    requestSuccess_register(dispatch, res.data.msg)
                } else {
                    requestFail_register(dispatch, res.data.msg);
                }
            })
            .catch(()=> requestFail_register(dispatch, 'failed'))
    }
};


export const registerUser = ( {rg_phone, rg_verify_code, rg_password, rg_invite_code } ) => {
    return (dispatch) => {

        dispatch({type: REGISTER_VERIFY}); //for Spinner;

        rinstance.post('http://pjbapi.wtvxin.com/api/Login/MobileRegister',
            `Mobile=${rg_phone}&VerifyCode=${rg_verify_code}&Password=${rg_password}`)
            .then (res=> {
                console.log('register result', res);
                console.log(res.data.errcode);

                if(res.data.errcode===0){
                    registerSuccess(dispatch, res.data.msg)
                } else {
                    registerFail(dispatch, res.data.msg);
                }
            })
            .catch(()=> registerFail(dispatch, 'failed'));
    }
};

const registerSuccess = (dispatch, msg) => {
    dispatch({
        type: REGISTER_SUCCESS,
        payload: msg
    });

    Actions.login();

};

const registerFail = (dispatch, msg) => {
    dispatch({
        type: REGISTER_FAIL,
        payload: msg
    });
};


const requestSuccess_register = (dispatch) => {
    dispatch({
        type: REGISTER_VERIFY_SUCCESS,
        payload: msg
    });
};

const requestFail_register = (dispatch, msg) => {
    dispatch({
        type: REGISTER_VERIFY_FAIL,
        payload: msg
    });
};

