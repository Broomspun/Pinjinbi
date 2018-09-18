import {
    GET_MY_ORDERS_SUMMARY_SUCCESS, GET_MY_ORDERS_SUMMARY_FAILURE, GET_MY_ORDERS_SUMMARY_LOADING,
} from "./types";

import { requestPOST_API,requestGET_API} from "../Services";

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
};
