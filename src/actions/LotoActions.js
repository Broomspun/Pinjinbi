import {
    GET_LOTO_ACTIVITIES_SUCCESS, GET_LOTO_ACTIVITIES_FAIL, GET_LOTO_ACTIVITIES_LOADING,
    TRIAL_LOTO_SUCCESS, TRIAL_LOTO_FAIL, TRIAL_LOTO_LOADING,
    LOTO_HISTORY_SUCCESS, LOTO_HISTORY_FAIL, LOTO_HISTORY_LOADING, INITIALIZE_LOTO, LOGIN_PARAMETER_UPDATED,
    USER_BUY_VIP_SUCCESS,USER_BUY_VIP_LOADING,USER_BUY_VIP_FAILURE,INITIALIZE_USER_BUY_VIP_STATUS
} from "./types";

import { requestPOST_API,requestGET_API} from "../Services";

export const getLotoPlayActivities = (UserId, Token)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_LOTO_ACTIVITIES_LOADING}); //for Spinner;
            let res = await requestPOST_API('Integral/LoadingPlayActivities',
                {UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_LOTO_ACTIVITIES_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_LOTO_ACTIVITIES_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

export const trialLoto = (UserId, Token, ActivitiesId)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: TRIAL_LOTO_LOADING}); //for Spinner;
            let res = await requestPOST_API('Integral/ClickPlayActivities',
                {UserId: UserId, Token: Token, ActivitiesId: ActivitiesId}
            );

            if(res.status===200) {
                dispatch({
                    type: TRIAL_LOTO_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: TRIAL_LOTO_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

export const getLotoHistory = (UserId, Token, ActivitiesId)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: LOTO_HISTORY_LOADING}); //for Spinner;
            let res = await requestPOST_API('Integral/GetMyWinningLog',
                {UserId: UserId, Token: Token, ActivitiesId: ActivitiesId}
            );

            if(res.status===200) {
                dispatch({
                    type: LOTO_HISTORY_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: LOTO_HISTORY_FAIL,
                    payload: res.msg
                });
            }
        })();
    };
};

export const initializeLoto = () => {
    return {
        type: INITIALIZE_LOTO,
    }
};

/**
* API 4.3
* http://pjbapi.wtvxin.com/api/Money/UserBuyVIP
* @param UserId
* @param Token
* @param SetMealId
* @returns {Function}
*/
export const userBuyVip = (UserId, Token, SetMealId)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: USER_BUY_VIP_LOADING}); //for Spinner;
            let res = await requestPOST_API('Money/UserBuyVIP',
                {UserId: UserId, Token: Token, SetMealId: SetMealId}
            );

            if(res.status===200) {
                dispatch({
                    type: USER_BUY_VIP_SUCCESS,
                    payload:{value: res.data}
                });
            } else {
                dispatch({
                    type: USER_BUY_VIP_FAILURE,
                    payload: {msg:res.msg,errCode: res.status}
                });
            }
        })();
    };
};
