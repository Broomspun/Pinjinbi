import {generatorCaptchaCode} from './../Helper'
import {
    AVATAR_SUCCESS,
    AVATAR_SUBMIT,
    AVATAR_CHANGED,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE1,
    OLD_PHONE_VERIFY_SMS_SUCCESS,NEW_PHONE_VERIFY_SMS_SUCCESS,
    OLD_PHONE_VERIFY_SUCCESS,NEW_PHONE_VERIFY_SUCCESS,
    MOBILE_CHANGE_SUCCESS, CHANGE_LOGIN_PASSWORD_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
    submitting: false,
    userAvatar: null,
    mc_sms_msg: '', //old phone sms: type: 6
    mc_msg_old:'',
    mc_captchaGenCode: generatorCaptchaCode(4), //mc_: mobile change for old  phone
    mc_sms_msg1: '', //new phone sms: type: 7
    mc_msg_new:'',
    mc_captchaGenCode1: generatorCaptchaCode(4), //mc_: mobile change for new phone
    bChangedMC: false, //Mobile number changed flag
    bChangedPassword: false //password changed flag
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AVATAR_SUBMIT:
            return {...state, submitting: true};
        case AVATAR_CHANGED:
            return {...state, userAvatar: action.payload};
        case AVATAR_SUCCESS:
            return {...state, submitting: false, userAvatar: action.payload};
        case MOBILE_CHANGE_REGENERATE_CAPTCHACODE:
            return {...state, mc_captchaGenCode: action.payload.value};
        case MOBILE_CHANGE_REGENERATE_CAPTCHACODE1:
            return {...state, mc_captchaGenCode1: action.payload.value};
        case OLD_PHONE_VERIFY_SMS_SUCCESS:
            return {...state, mc_sms_msg: action.payload};
        case NEW_PHONE_VERIFY_SMS_SUCCESS:
            return {...state, mc_sms_msg1: action.payload};
        case OLD_PHONE_VERIFY_SUCCESS:
            return {...state, mc_msg_old: action.payload};
        case NEW_PHONE_VERIFY_SUCCESS:
            return {...state, mc_msg_new: action.payload};
        case MOBILE_CHANGE_SUCCESS:
            return {...state, bChangedMC: true};
        case CHANGE_LOGIN_PASSWORD_SUCCESS:
            return {...state, bChangedPassword: true};
        default:
            return state;
    }
}
