import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {generatorCaptchaCode} from './../Helper'

import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS,
    REGENERATE_CAPTCHACODE
} from "./types";

export const forgottenVerifyParameterUpdated = ({ prop, value }) => {
    return {
        type: FORGOTTEN_VERIFY_PARAMETER_UPDATED,
        payload: {prop, value}
    }
};

export const regenerateRecaptchaCode = () => {
    return {
        type: REGENERATE_CAPTCHACODE,
        payload: {value: generatorCaptchaCode(4)}
    }
};

export const requestVerifyCode = ({fv_phone,  fv_recaptchaCode}) =>{
  return (dispatch) =>{

      let instance = axios.create({
          headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
      });

      instance.post('http://pjbapi.wtvxin.com/api/Login/GetUserSms',
          `Mobile=${fv_phone}&VerifyType=${fv_recaptchaCode}`)
          .then (res=> {
              console.log(res);
              console.log(res.data.errcode);
              if(res.data.errcode===0){
                  requestSuccess(dispatch, res.data.msg)
              } else {
                  requestFail(dispatch, res.data.msg);
              }
          })
          .catch(()=> requestFail(dispatch, 'failed'))
  }
};

const requestSuccess = (dispatch) => {
    dispatch({
        type: FORGOTTEN_VERIFY_SUCCESS,
        payload: msg
    });
};

const requestFail = (dispatch, msg) => {
  dispatch({
      type: FORGOTTEN_VERIFY_FAIL,
      payload: msg
  });
};
