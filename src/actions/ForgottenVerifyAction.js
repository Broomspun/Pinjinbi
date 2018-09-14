import {requestPOST_API} from "../Services";

import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS, FORGOTTEN_LOADNIG
} from "./types";

export const forgottenVerifyParameterUpdated = ({ prop, value }) => {
    return {
        type: FORGOTTEN_VERIFY_PARAMETER_UPDATED,
        payload: {prop, value}
    }
};

export const requestVerifyCode = (Mobile,  ImgCode, OnlyVal) =>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: FORGOTTEN_LOADNIG}); //for Spinner;

            let res = await requestPOST_API('Member/GetSms',
                {Mobile: Mobile, VerifyType: 2, ImgCode: ImgCode, OnlyVal: OnlyVal},
            );
            if(res.status===200) {
                dispatch({
                    type: FORGOTTEN_VERIFY_SUCCESS,
                    payload: res.msg
                });
            } else {
                dispatch({
                    type: FORGOTTEN_VERIFY_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

