import {submitAvatar_API} from './../Services'

import {
    AVATAR_SUBMIT, AVATAR_SUCCESS
} from "./types";

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
    })
};
