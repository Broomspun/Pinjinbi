import {generatorCaptchaCode} from './../Helper'
import {
    AVATAR_SUCCESS,
    AVATAR_SUBMIT,
    AVATAR_CHANGED,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE,
    MOBILE_CHANGE_GET_VC_CODE_1ST_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
    submitting: false,
    userAvatar: null,
    mc_msg: '',
    mc_captchaGenCode: generatorCaptchaCode(4), //mc_: mobile change
};


export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case AVATAR_SUBMIT:
            return {...state, submitting: true};
        case AVATAR_CHANGED:
            return {...state, userAvatar: action.payload};
        case AVATAR_SUCCESS:
            return {...state, submitting: false, userAvatar: action.payload};
        case MOBILE_CHANGE_REGENERATE_CAPTCHACODE:
            return {...state, mc_captchaGenCode: action.payload.value};
        case MOBILE_CHANGE_GET_VC_CODE_1ST_SUCCESS:
            return {...state, mc_msg: action.payload};
        default:
            return state;
    }
}
