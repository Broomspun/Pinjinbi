import {
    GET_LOTO_ACTIVITIES_SUCCESS, GET_LOTO_ACTIVITIES_FAIL, GET_LOTO_ACTIVITIES_LOADING,
    TRIAL_LOTO_SUCCESS, TRIAL_LOTO_FAIL, TRIAL_LOTO_LOADING,
    LOTO_HISTORY_SUCCESS, LOTO_HISTORY_FAIL, LOTO_HISTORY_LOADING
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
