import {submitAvatar_API, getVerifyCode_API} from './../Services'
import {Constants} from "@common";
import {
    AVATAR_SUBMIT, AVATAR_SUCCESS, AVATAR_CHANGED,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE, MOBILE_CHANGE_GET_VC_CODE_1ST_SUCCESS,MOBILE_CHANGE_GET_VC_CODE_2nd_SUCCESS
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

export const getVerifyCode_mc = (phone, verifyType, captcha) => {
    let type;
    switch(verifyType) {
        case 6:
            type = MOBILE_CHANGE_GET_VC_CODE_1ST_SUCCESS;
            break;
        case 7:
            type = MOBILE_CHANGE_GET_VC_CODE_2ND_SUCCESS;
            break;
    }
    return (dispatch) => {
        (async ()=>{
            let res = await getVerifyCode_API(phone, verifyType, captcha);
            console.log('verify code',res);
            if(res.status===200) {
                dispatch({
                    type: type,
                    payload: res.data.msg
                })

                // actions.
            }
        })();
    };
};


