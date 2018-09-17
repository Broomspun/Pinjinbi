import {submitAvatar_API, ChangePassword_API,requestPOST_API} from './../Services'
import {Constants} from "@common";
import {
    AVATAR_SUBMIT, AVATAR_SUCCESS, AVATAR_CHANGED,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE,

    OLD_PHONE_VERIFY_SMS_SUCCESS, NEW_PHONE_VERIFY_SMS_SUCCESS,
    OLD_PHONE_VERIFY_SMS_FAILURE, NEW_PHONE_VERIFY_SMS_FAILURE,

    OLD_PHONE_VERIFY_SUCCESS, NEW_PHONE_VERIFY_SUCCESS,
    MOBILE_CHANGE_SUCCESS,MOBILE_CHANGE_FAILURE,
    CHANGE_LOGIN_PASSWORD_SUCCESS,CHANGE_LOGIN_PASSWORD_FAILURE,
    REGISTER_VERIFY_FAIL,
    NEW_PHONE_VERIFY_FAILURE, OLD_PHONE_VERIFY_FAILURE,
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
                    payload: res.data.msg
                });
            }
            else {
                dispatch({
                    type: type_f,
                    payload: res.data.msg
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
                    payload: res.msg
                });

                if(VerifyType===6)  //in case of success of verification for changing mobile number
                     Actions.changeoldtonewphone();
            }
            else {
                dispatch({
                    type: type_f,
                    payload: res.msg
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
            let res = await ChangePassword_API(UserId, Token, OldLoginPwd, NewLoginPwd);

            if(res.status===200) {
                dispatch({
                    type: CHANGE_LOGIN_PASSWORD_SUCCESS,
                });
             }
        })();
    };
};
