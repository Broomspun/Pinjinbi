import {generatorCaptchaCode} from './../Helper'
import {
    REGISTER_PARAMETER_UPDATED,
    REGISTER_VERIFY_SUCCESS,
    REGISTER_VERIFY_FAIL,
    REGISTER_VERIFY,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_REGENERATE_CAPTCHACODE
} from './../actions/types';

const INITIAL_STATE = {
    // rg_phone: '18641568923', //ksi
    rg_phone: '18741586976',
    rg_password: 'password123',
    rg_captcha_match: '',
    rg_captcha_code: generatorCaptchaCode(4),
    rg_verify_code: '',
    rg_invite_code: '',
    rg_verified: null,
    rg_qq_code: '',
    rg_qq_group: '',
    rg_verify_loading: false,
    rg_verify_msg: '',
    rg_register_msg: '',
    rg_registered: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_PARAMETER_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value};
        case REGISTER_REGENERATE_CAPTCHACODE:
            return {...state, rg_captcha_code: action.payload.value};
        case REGISTER_VERIFY_FAIL:
            return {...state, rg_verified: false, rg_verify_msg: action.payload, rg_verify_loading: false};
        case REGISTER_VERIFY_SUCCESS:
            return {...state, rg_verified: true,  rg_verify_msg: action.payload, rg_verify_loading: false};
        case REGISTER_VERIFY:
            return {...state, rg_verify_loading: true};
        case REGISTER_FAIL:
            return {...state, rg_registered: false, rg_register_msg: action.payload, rg_verify_loading: false};
        case REGISTER_SUCCESS:
            return {...state, rg_registered: true, rg_register_msg: action.payload, rg_verify_loading: false, ...INITIAL_STATE};
        default:
            return state;
    }
}

