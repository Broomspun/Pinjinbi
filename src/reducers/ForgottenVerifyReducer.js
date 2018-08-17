import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS,
    REGENERATE_CAPTCHACODE
} from "./../actions/types";

import {generatorCaptchaCode} from './../Helper'

const INITIAL_STATE = {
    fv_phone: '18641568923',
    fv_recaptchaMatch: '',
    fv_verifycode: '',
    fv_recaptchaCode: generatorCaptchaCode(4),
    loading: false,
    error: '',
    verified: false,
    verify_msg: '',
    verify_show: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORGOTTEN_VERIFY_PARAMETER_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value };
        case REGENERATE_CAPTCHACODE:
            return {...state, fv_recaptchaCode: action.payload.value};
        case FORGOTTEN_VERIFY_FAIL:
            return {...state, verified: false, verify_msg: action.payload, verify_show: true};
        case FORGOTTEN_VERIFY_SUCCESS:
            return {...state, verified: true,  verify_msg: action.payload, verify_show: true};
        default:
            return state;
    }
}
