import {
    GET_MY_ORDERS_SUMMARY_SUCCESS, GET_MY_ORDERS_SUMMARY_FAILURE, GET_MY_ORDERS_SUMMARY_LOADING,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_INITIAL,
    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_LOADING,
    GET_TASK_LIST_FAILURE,
    GET_TASK_LIST_INITIAL,

} from "./types";


import { requestPOST_API,requestGET_API} from "../Services";

/**
 * @param UserId
 * @param Token
 * @returns {Function}
 */
export const getMyOrdersSummary = (UserId, Token)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MY_ORDERS_SUMMARY_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetMyOrderCount',
                {UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_MY_ORDERS_SUMMARY_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_MY_ORDERS_SUMMARY_FAILURE,
                    payload: {value:res.msg, msg: res.msg}
                });
            }
        })();
    };
}
;
/**
 * API 6.0 http://pjbapi.wtvxin.com/api/Task/GetMemberCanReceiveAccount
 * @param UserId
 * @param Token
 * @param PlatId
 * @param TaskType
 * @returns {Function}
 */
export const getMemberCanReceiveAccount = (UserId, Token,PlatId, TaskType)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetMemberCanReceiveAccount',
                {UserId: UserId, Token: Token, PlatId: PlatId,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
};

export const getTaskList = (UserId, Token,Page,PageSize,AccountId,PlatId,MaxAdvandcePayMoney, TaskType)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_TASK_LIST_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetTaskList',
                {UserId: UserId, Token: Token, Page: Page,PageSize: PageSize,AccountId: AccountId,PlatId:PlatId,MaxAdvandcePayMoney:MaxAdvandcePayMoney,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_TASK_LIST_SUCCESS,
                    payload: {value:res, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_TASK_LIST_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}
