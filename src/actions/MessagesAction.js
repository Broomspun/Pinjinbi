import {GET_SYSTEM_MESSAGES_SUCCESS, GET_SYSTEM_MESSAGES_FAIL, GET_SYSTEM_MESSAGES_LOADING,
    GET_SYSTEM_MESSAGE_DETAIL_SUCCESS, GET_SYSTEM_MESSAGE_DETAIL_LOADING, GET_SYSTEM_MESSAGE_DETAIL_FAIL,
    GET_ANNOUNCE_MESSAGES_SUCCESS, GET_ANNOUNCE_MESSAGES_LOADING, GET_ANNOUNCE_MESSAGES_FAIL,
    GET_HELP_LISTS_SUCCESS,GET_HELP_LISTS_FAIL, GET_HELP_LISTS_LOADING,
    GET_HELP_DETAIL_SUCCESS, GET_HELP_DETAIL_FAIL, GET_HELP_DETAIL_LOADING,
} from "./types";
import {requestPOST_API, requestGET_API} from "../Services";

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

            let res = await requestPOST_API('Notice/GetNoticeByMember',
                {UserId:UserId, Token: Token, SendType: SendType,Page:Page,PageSize:PageSize}
            );

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


export const getSystemMessageDetail = (UserId, Token, NoticeId)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_SYSTEM_MESSAGE_DETAIL_LOADING}); //for Spinner;
            let res = await requestPOST_API('Notice/ReadNoticeInfo',
                {UserId: UserId, Token: Token, NoticeId: NoticeId}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_SYSTEM_MESSAGE_DETAIL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_SYSTEM_MESSAGE_DETAIL_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};
export const getHelpLists = () => {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_HELP_LISTS_LOADING}); //for Spinner;
            let res = await requestGET_API('Help/GetAllHelpClass');

            if(res.status===200) {
                dispatch({
                    type: GET_HELP_LISTS_SUCCESS,
                    payload: {helplists: res.data.HelpClassList, qqConsult: res.data.ConsultationQQ}
                });
            } else {
                dispatch({
                    type: GET_HELP_LISTS_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};
export const getHelpDetail = (id, SearchKeyword='', Page=1,PageSize=10) => {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_HELP_DETAIL_LOADING}); //for Spinner;
            let res = await requestPOST_API('Help/GetHelpList',
                {HelpClassId: id, Page: Page, PageSize: PageSize, SarchKeyword: SearchKeyword}
                );

            if(res.status===200) {
                dispatch({
                    type: GET_HELP_DETAIL_SUCCESS,
                    payload: res.data.HelpClassList
                });
            } else {
                dispatch({
                    type: GET_HELP_DETAIL_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};
