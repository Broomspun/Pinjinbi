import {
    GET_MY_ORDERS_SUMMARY_SUCCESS,
    GET_MY_ORDERS_SUMMARY_FAILURE,
    GET_MY_ORDERS_SUMMARY_LOADING,

    GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE,

    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_LOADING,
    GET_TASK_LIST_FAILURE,
    USER_DETERMINE_TASK_LOADING, USER_DETERMINE_TASK_SUCCESS, USER_DETERMINE_TASK_FAILURE,
    SYSTEM_SEND_TASK_FAILURE, SYSTEM_SEND_TASK_SUCCESS, SYSTEM_SEND_TASK_LOADING,


} from "./types";


import { requestPOST_API,requestGET_API} from "../Services";

/**
 * API 9.3 http://pjbapi.wtvxin.com/api/Task/GetMyOrderCount
 *         Get the total number of orders in different states under different task types
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

/**
 * API 6.1 http://pjbapi.wtvxin.com/api/Task/GetTaskList
 * @param UserId
 * @param Token
 * @param AccountId
 * @param PlatId
 * @param MaxAdvandcePayMoney
 * @param TaskType 1: Advanced Task, 2: Browse Task
 * @param Page = 1 (default)
 * @param PageSize = 10 (default)
 * @returns {Function}
 */
export const getTaskList = (UserId, Token, AccountId, PlatId, MaxAdvandcePayMoney, TaskType, Page=1, PageSize=10)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_TASK_LIST_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetTaskList',
                {UserId: UserId, Token: Token, Page: Page,PageSize: PageSize,AccountId: AccountId,PlatId:PlatId,MaxAdvandcePayMoney:MaxAdvandcePayMoney,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_TASK_LIST_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_TASK_LIST_FAILURE,
                    payload: {value:null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};

/**
 * API 8.5 http://pjbapi.wtvxin.com/api/Task/SystemSendTask, System dispatch
 * @param UserId
 * @param Token
 * @param AccountId
 * @param PlatId
 * @param MaxAdvandcePayMoney
 * @param TaskType
 * @returns {Function}
 */
export const systemSendTask = (UserId, Token, AccountId, PlatId, MaxAdvandcePayMoney, TaskType)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SYSTEM_SEND_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/SystemSendTask',
                {UserId: UserId, Token: Token, AccountId: AccountId,PlatId:PlatId,MaxAdvandcePayMoney:MaxAdvandcePayMoney,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: SYSTEM_SEND_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SYSTEM_SEND_TASK_FAILURE,
                    payload: {value:null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};

/**
 * API 6.2 http://pjbapi.wtvxin.com/api/Task/UserDetermineTask
 * @param UserId
 * @param Token
 * @param AccountId: PlatAccount
 * @param TaskListNo: Task List Number
 * @returns {Function}
 */
export const UserDetermineTask = (UserId, Token, AccountId, TaskListNo) => {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: USER_DETERMINE_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetTaskList',
                {UserId: UserId, Token: Token, AccountId: AccountId, TaskListNo: TaskListNo}
            );
            if(res.status===200) {
                dispatch({
                    type: USER_DETERMINE_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: USER_DETERMINE_TASK_FAILURE,
                    payload: {value:null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};
