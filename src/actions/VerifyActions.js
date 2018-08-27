import {getBindingInfo, submitQQInfo_API} from './../Services'

import {
    GET_BIND_INFO, QQ_SUBMIT_SUCCESS
} from "./types";

export const get_bindInfo = (UserId, Token) => {
    return (dispatch) => {
        let bindInfo = null;
        (async ()=>{
            bindInfo = await getBindingInfo(UserId, Token);
            if(bindInfo.status===200)
                getBindInfoSuccess(dispatch, bindInfo.data);
        })();
    };
};

const getBindInfoSuccess = async (dispatch, bindInfo)=>{
    dispatch({
        type: GET_BIND_INFO,
        payload: bindInfo
    })
};


export const submitQQInfo = (UserId, Token, qq_num) => {
    return (dispatch) => {
        (async ()=>{
            let res = await submitQQInfo_API(UserId, Token, qq_num);
            if(res.status===200)
                QQ_SubmitSuccess(dispatch, res.data);
        })();
    };
};


const QQ_SubmitSuccess = (dispatch, data)=>{
    dispatch({
        type: QQ_SUBMIT_SUCCESS,
        payload: data
    })
};
