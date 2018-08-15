import {generatorCaptchaCode} from './../Helper'
import {
    REGISTER_PARAMETER_UPDATED,
    REGISTER_VERIFY_SUCCESS,
    REGISTER_FAIL,
    REGISTER_VERIFY_FAIL,
    REGISTER_SUCCESS,
    REGISTER_REGENERATE_CAPTCHACODE
} from './../actions/types';
import {REGENERATE_CAPTCHACODE} from "../actions/types";

const INITIAL_STATE = {
    rg_phone: '18641568923',
    rg_password: '123456',
    rg_captcha_match: '',
    rg_captcha_code: generatorCaptchaCode(4),
    rg_verify_code: ''
};

// let remember_status = INITIAL_STATE.remember;

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case REGISTER_PARAMETER_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value};
        case REGISTER_REGENERATE_CAPTCHACODE:
            return {...state, rg_captcha_code: action.payload.value};
        default:
            return state;
    }
}

