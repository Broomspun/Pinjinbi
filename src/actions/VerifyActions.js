import {getBindingInfo} from './../Services'

import {
    GET_BIND_INFO
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
