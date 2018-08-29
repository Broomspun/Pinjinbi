import {getBindingInfo, submitQQInfo_API, submitIdCard_API, submitBankInfo_API} from './../Services'

import {
    GET_BIND_INFO, QQ_SUBMIT_SUCCESS,ID_CARD_SUBMIT_SUCCESS,BANK_INFO_SUBMIT_SUCCESS
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


export const submitIdCardInfo = (UserId, Token,UserName,Idcard,IdCardImgOne,IdCardImgTwo,IdCardImgThree)=> {
    return (dispatch) => {
        (async ()=>{
            let res = await submitIdCard_API(UserId, Token,UserName,Idcard,IdCardImgOne,IdCardImgTwo,IdCardImgThree);
            console.log('id_res', res);
            if(res.status===200)
                IdCard_SubmitSuccess(dispatch, res.data);
        })();
    };
};

const IdCard_SubmitSuccess = (dispatch, data)=>{
    dispatch({
        type: ID_CARD_SUBMIT_SUCCESS,
        payload: data
    })
};


export const submitBankInfo = (UserId, Token, BankName, BankCardNo, BankAddress, BankCardName)=> {
    return (dispatch) => {
        (async ()=>{
            let res = await submitBankInfo_API(UserId, Token, BankName, BankCardNo, BankAddress, BankCardName);
            console.log('bank_res', res);
            if(res.status===200)
                Bank_SubmitSuccess(dispatch, res.data);
        })();
    };
};

const Bank_SubmitSuccess = (dispatch, data)=>{
    dispatch({
        type: BANK_INFO_SUBMIT_SUCCESS,
        payload: data
    })
};
