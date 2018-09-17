import {
    GET_LOTO_ACTIVITIES_SUCCESS,
    GET_LOTO_ACTIVITIES_FAIL,
    GET_LOTO_ACTIVITIES_LOADING,
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
