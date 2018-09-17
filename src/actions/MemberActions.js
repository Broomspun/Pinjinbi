import {
    GET_MEMBER_INVITE_SUCCESS, GET_MEMBER_INVITE_FAIL, GET_MEMBER_INVITE_LOADING,
    IS_NOVICE_TASK_COMPLETED_SUCCESS, IS_NOVICE_TASK_COMPLETED_FAIL, IS_NOVICE_TASK_COMPLETED_LOADING,
} from "./types";

import { requestPOST_API,requestGET_API} from "../Services";

export const getMemberByInvite = (UserId, Token)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MEMBER_INVITE_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/GetMemberByInvite',
                {UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_MEMBER_INVITE_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_MEMBER_INVITE_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

export const isCompletedNoviceTask = (UserId, Token) => { //
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: IS_NOVICE_TASK_COMPLETED_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/IsCompleteNoviceTask',
                {UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: IS_NOVICE_TASK_COMPLETED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: IS_NOVICE_TASK_COMPLETED_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
} ;
