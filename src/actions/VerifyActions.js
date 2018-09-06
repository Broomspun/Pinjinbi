import {requestPOST_API} from './../Services'

import {
    GET_BIND_INFO, QQ_SUBMIT_SUCCESS,ID_CARD_SUBMIT_SUCCESS,BANK_INFO_SUBMIT_SUCCESS
} from "./types";

export const get_bindInfo = (UserId, Token) => {
    return (dispatch) => {
        let bindInfo = null;
        (async ()=>{
            bindInfo = await requestPOST_API('Member/GetBindPageData',
                {UserId: UserId, Token: Token});

            if(bindInfo.status===200)
                dispatch({
                    type: GET_BIND_INFO,
                    payload: bindInfo.data
                })
        })();
    };
};


export const submitQQInfo = (UserId, Token, UserQQ) => {
    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('Member/BindUserQQ',
                {UserId: UserId, Token: Token, UserQQ: UserQQ});

            if(res.status===200)
                dispatch({
                    type: QQ_SUBMIT_SUCCESS,
                    payload: res.data
                })
        })();
    };
};

export const submitIdCardInfo = (UserId, Token,UserName,Idcard,IdCardImgOne,IdCardImgTwo,IdCardImgThree)=> {
    return (dispatch) => {
        (async ()=>{
            // let res = await submitIdCard_API(UserId, Token,UserName,Idcard,IdCardImgOne,IdCardImgTwo,IdCardImgThree);
            let res = await requestPOST_API('/Member/BindUserIdCard',
                {
                    UserId:UserId,Token:Token,UserRName:UserName,Idcard:Idcard, IdCardImgOne:IdCardImgOne,IdCardImgTwo:IdCardImgTwo,IdCardImgThree:IdCardImgThree
                }
                );

            console.log('id_res', res);
            if(res.status===200)
                dispatch({
                    type: ID_CARD_SUBMIT_SUCCESS,
                    payload: res.data
                });
                // IdCard_SubmitSuccess(dispatch, res.data);
        })();
    };
};


export const submitBankInfo = (UserId, Token, BankName, BankCardNo, BankAddress, BankCardName)=> {
    return (dispatch) => {
        (async ()=>{
            // let res = await submitBankInfo_API(UserId, Token, BankName, BankCardNo, BankAddress, BankCardName);
            let res = await requestPOST_API('Member/BindUserBank',
                {UserId: UserId,Token:Token,BankName:BankName,BankCardNo:BankCardNo, BankAddress:BankAddress,BankCardName:BankCardName}
            );
            console.log('bank_res', res);
            if(res.status===200)
                dispatch({
                    type: BANK_INFO_SUBMIT_SUCCESS,
                    payload: res.data
                })
        })();
    };
};

