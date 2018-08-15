import axios from "axios/index";
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

        let instance = axios.create({
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        });

        dispatch({type: REGISTER_VERIFY}); //for Spinner;

        instance.post('http://pjbapi.wtvxin.com/api/Login/GetUserSms',
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

