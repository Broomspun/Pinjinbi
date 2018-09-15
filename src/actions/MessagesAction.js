import {GET_SYSTEM_MESSAGES_SUCCESS, GET_SYSTEM_MESSAGES_FAIL, GET_SYSTEM_MESSAGES_LOADING,
    GET_ANNOUNCE_MESSAGES_SUCCESS, GET_ANNOUNCE_MESSAGES_LOADING, GET_ANNOUNCE_MESSAGES_FAIL,
} from "./types";
import {requestPOST_API} from "../Services";

/**
 * @param UserId
 * @param Token
 * @param SendType 1: system message, 0: announcement message
 * @param Page
 * @param PageSize
 * @returns {Function}
 */
export const getSystemMessages = (UserId,Token,SendType,Page=1,PageSize=10) => {
    return (dispatch) =>{
        (async ()=> {
            if(SendType===1)
                dispatch({type: GET_SYSTEM_MESSAGES_LOADING}); //for Spinner;
            else
                dispatch({type: GET_ANNOUNCE_MESSAGES_LOADING}); //for Spinner;

            console.log(UserId,Token,SendType);
            let res = await requestPOST_API('Notice/GetNoticeByMember',
                {UserId:UserId, Token: Token, SendType: SendType,Page:Page,PageSize:PageSize}
            );

            console.log('messages', res);
            if(res.status===200) {
                dispatch({
                    type: SendType===1?GET_SYSTEM_MESSAGES_SUCCESS: GET_ANNOUNCE_MESSAGES_SUCCESS,
                    payload: res.data.NoticeList
                });
            } else {
                dispatch({
                    type: SendType===1?GET_SYSTEM_MESSAGES_FAIL: GET_ANNOUNCE_MESSAGES_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

