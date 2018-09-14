import axios from "axios";
import {Actions} from 'react-native-router-flux';
import {generatorCaptchaCode} from "../Helper";
import {requestPOST_API} from "../Services";

import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_PARAMETER_UPDATED,
    REGISTER_REGENERATE_CAPTCHACODE,
    REGISTER_VERIFY,
    REGISTER_VERIFY_FAIL,
    REGISTER_VERIFY_SUCCESS
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


export const requestVerifyCode_register = (rg_phone) =>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: REGISTER_VERIFY}); //for Spinner;

            let res = await requestPOST_API('Login/GetUserSms',
                {Mobile:rg_phone,VerifyType:0},
            );
            if(res.status===200) {
                dispatch({
                    type: REGISTER_VERIFY_SUCCESS,
                    payload: res.msg
                });
            } else {
                dispatch({
                    type: REGISTER_VERIFY_FAIL,
                    payload: 'Failed'
                });
            }
        })();
    };
};


export const registerUser = ( rg_phone, rg_verify_code, rg_password, rg_invite_code ) => {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: REGISTER_VERIFY}); //for Spinner;

            let res = await requestPOST_API('Login/MobileRegister',
                {Mobile:rg_phone, VerifyCode: rg_verify_code, Password: rg_password}
            );
            if(res.status===200) {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.msg
                });

                Actions.login();
            } else {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

