import {submitAvatar_API} from './../Services'
import {Constants} from "@common";
import {
    AVATAR_SUBMIT, AVATAR_SUCCESS,AVATAR_CHANGED
} from "./types";

import {Actions} from 'react-native-router-flux';

export const changedAvatar = (avatar) => {
    return (dispatch) => {
        dispatch({
            type: AVATAR_CHANGED,
            payload: avatar
        })
    }
};

export const submitAvatar = (userid, token, avatar) => {

    return (dispatch) => {
        dispatch({
            type: AVATAR_SUBMIT,
        });
        (async () => {
            let res = await submitAvatar_API(userid, token, avatar);

            if(res.status===200) {
                Avatar_SubmitSuccess(dispatch, res.data);
            }
        })()

    }
};

const Avatar_SubmitSuccess = (dispatch, data) => {
    dispatch({
        type: AVATAR_SUCCESS,
        payload: data
    });

    Actions.usercentermain();
};
