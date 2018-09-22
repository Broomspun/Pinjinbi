import {submitAvatar_API, ChangePassword_API,requestPOST_API} from './../Services'
import {Constants} from "@common";
import {
    AVATAR_SUBMIT,
    AVATAR_SUCCESS,
    AVATAR_CHANGED,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE,

    OLD_PHONE_VERIFY_SMS_SUCCESS,
    NEW_PHONE_VERIFY_SMS_SUCCESS,
    OLD_PHONE_VERIFY_SMS_FAILURE,
    NEW_PHONE_VERIFY_SMS_FAILURE,

    OLD_PHONE_VERIFY_SUCCESS,
    NEW_PHONE_VERIFY_SUCCESS,
    MOBILE_CHANGE_SUCCESS,
    MOBILE_CHANGE_FAILURE,
    CHANGE_LOGIN_PASSWORD_SUCCESS,

    NEW_PHONE_VERIFY_FAILURE,
    OLD_PHONE_VERIFY_FAILURE,

    GET_LOADSIGNINPAGE_SUCCESS,
    GET_LOADSIGNINPAGE_FAILURE,
    GET_LOADSIGNINPAGE_SYSTEMERROR,
    GET_LOADSIGNINPAGE_RELOGIN,
    GET_LOADSIGNINPAGE_SIGNED,

    SIGN_IN_GET_POINTS_SUCCESS,
    SIGN_IN_GET_POINTS_FAILURE,
    SIGN_IN_GET_POINTS_LOADING,
    SIGN_IN_GET_POINTS_SYSTEMERROR,
    SIGN_IN_GET_POINTS_RELOGIN,
    SIGN_IN_GET_POINTS_SIGNED, GET_LOADSIGNINPAGE_LOADING
} from "./types";

import {Actions} from 'react-native-router-flux';
import {generatorCaptchaCode} from "../Helper";

export const changedAvatar = (avatar) => {
    return (dispatch) => {
        dispatch({
            type: AVATAR_CHANGED,
            payload: avatar
        })
    }
};

export const submitAvatar = (userid, token, avatar) => {

    return (dispatch) => {
        dispatch({
            type: AVATAR_SUBMIT,
        });
        (async () => {
            let res = await submitAvatar_API(userid, token, avatar);

            if(res.status===200) {
                Avatar_SubmitSuccess(dispatch, res.data);
            }
        })()

    }
};

const Avatar_SubmitSuccess = (dispatch, data) => {
    dispatch({
        type: AVATAR_SUCCESS,
        payload: data
    });

    Actions.usercentermain();
};


export const generateCaptchaCode_mc = () => {
    return {
        type: MOBILE_CHANGE_REGENERATE_CAPTCHACODE,
        payload: {value: generatorCaptchaCode(4)}
    }
};

export const getVerifySMSCode_mc = (phone, verifyType, captchaCode, uniqueVal) => {
    let type_s, type_f;
    switch(verifyType) {
        case 6:
            type_s = OLD_PHONE_VERIFY_SMS_SUCCESS;
            type_f = OLD_PHONE_VERIFY_SMS_FAILURE;
            break;
        case 7:
            type_s = NEW_PHONE_VERIFY_SMS_SUCCESS;
            type_f = NEW_PHONE_VERIFY_SMS_FAILURE;
            break;
    }
    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('Member/GetSms',
                {Mobile:phone, VerifyType: verifyType, ImgCode: captchaCode, OnlyVal: uniqueVal});
            console.log('verify code',res);
            if(res.status===200) {
                dispatch({
                    type: type_s,
                    payload: {msg: res.msg, status: true}
                });
            }
            else {
                dispatch({
                    type: type_f,
                    payload: {msg: res.msg, status: false}
                });
            }
        })();
    };
};

export const getVerifyPhone = (Mobile, VerifyType, VerifyCode, UserId, Token)=>{
    let type_s, type_f;
    switch(VerifyType) {
        case 6:
            type_s = OLD_PHONE_VERIFY_SUCCESS;
            type_f = OLD_PHONE_VERIFY_FAILURE;
            break;
        case 7:
            type_s = NEW_PHONE_VERIFY_SUCCESS;
            type_f = NEW_PHONE_VERIFY_FAILURE;
            break;
    }
    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('Member/VerificationMobile',
                {Mobile: Mobile, VerifyType: VerifyType, VerifyCode: VerifyCode, UserId: UserId, Token:Token}
            );

            if(res.status===200) {
                dispatch({
                    type: type_s,
                    payload: {msg: res.msg, status: true}
                });

                if(VerifyType===6)  //in case of success of verification for changing mobile number
                     Actions.changeoldtonewphone();
            }
            else {
                dispatch({
                    type: type_f,
                    payload: {msg: res.msg, status: false}
                });
            }
        })();
    };
};

export const changeMobileNumber = (NewMobile, VerifyCode, VerifyType, UserId, Token)=> {
    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('Member/SubmitModifyByMobile',
                {NewMobile: NewMobile,VerifyType: 7, VerifyCode: VerifyCode, UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: MOBILE_CHANGE_SUCCESS,
                    payload: res.msg
                });
            } else {
                dispatch({
                    type: MOBILE_CHANGE_FAILURE,
                    payload: res.msg
                })
            }
        })();
    };
};

export const resetRequestStatus = ()=>{
    return (dispatch) => {
        dispatch({
            type: AVATAR_SUBMIT,
        });
    }
};

export const changePassword = (UserId, Token, OldLoginPwd, NewLoginPwd)=> {
    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('Member/SubmitModifyByPassword',
                {UserId: UserId, Token: Token, OldLoginPwd: OldLoginPwd, NewLoginPwd: NewLoginPwd}
            );

            if(res.status===200) {
                dispatch({
                    type: CHANGE_LOGIN_PASSWORD_SUCCESS,
                });
             }
        })();
    };
};

/**
 * API 4.4
 *      http://pjbapi.wtvxin.com/api/Integral/LoadSignInPage
 * @param UserId
 * @param Token
 * @returns {Function}
 */
export const loadSignInPage =(UserId, Token)=>{
    return (dispatch) =>{
        (async ()=>{
            dispatch({type: GET_LOADSIGNINPAGE_LOADING});
            let res = await requestPOST_API('Integral/LoadSignInPage',
                {UserId: UserId,Token: Token}
            );
            if (res.status===200){
                dispatch({
                    type: GET_LOADSIGNINPAGE_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            }else if(res.status ===1){
                dispatch({
                    type: GET_LOADSIGNINPAGE_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }else if(res.status === 2){
                dispatch({
                    type: GET_LOADSIGNINPAGE_RELOGIN,
                    payload: {value:res.data, msg: res.msg,errCode:res.status}
                });
            }else if (res.status ===3){
                dispatch({
                    type: GET_LOADSIGNINPAGE_SIGNED,
                    payload: {value:res.data, msg: res.msg, errCode:res.status}
                });
            }
            else {
                dispatch({
                    type: GET_LOADSIGNINPAGE_SYSTEMERROR,
                    payload: {value:res, msg: res.msg, errCode:res.status}
                });
            }
        })();
    }
};

/**
 * API 4.5
 * http://pjbapi.wtvxin.com/api/Integral/SignInGetPoints
 * @param UserId
 * @param Token
 * @returns {Function}
 */
export const signInGetPoints =(UserId, Token)=>{
    return (dispatch) =>{
        (async ()=>{
            dispatch({type: SIGN_IN_GET_POINTS_LOADING});
            let res = await requestPOST_API('Integral/SignInGetPoints',
                {UserId: UserId,Token: Token}
            );
            dispatch({payload:res,type:"test_signingetpoints"});
            if (res.status===200){
                dispatch({
                    type: SIGN_IN_GET_POINTS_SUCCESS,
                    payload: {value:res.data, msg: res.msg,errCode: res.status}
                });
            }else if(res.status ===1){
                dispatch({
                    type: SIGN_IN_GET_POINTS_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }else if (res.status===2){
                dispatch({
                    type: SIGN_IN_GET_POINTS_RELOGIN,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }else if (res.status ==3){
                dispatch({
                    type: SIGN_IN_GET_POINTS_SIGNED,
                    payload: {value:res.data, msg: res.msg,errCode: res.status}
                });
            }
            else {
                dispatch({
                    type: SIGN_IN_GET_POINTS_SYSTEMERROR,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    }
}

