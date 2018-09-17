import {generatorCaptchaCode} from './../Helper'
import {
    AVATAR_SUCCESS,
    AVATAR_SUBMIT,
    AVATAR_CHANGED,
    OLD_PHONE_VERIFY_SMS_SUCCESS, NEW_PHONE_VERIFY_SMS_SUCCESS,
    OLD_PHONE_VERIFY_SMS_FAILURE, NEW_PHONE_VERIFY_SMS_FAILURE,
    LOGOUT_USER,
    OLD_PHONE_VERIFY_SUCCESS, NEW_PHONE_VERIFY_SUCCESS,
    MOBILE_CHANGE_SUCCESS, CHANGE_LOGIN_PASSWORD_SUCCESS, OLD_PHONE_VERIFY_FAILURE, NEW_PHONE_VERIFY_FAILURE
} from './../actions/types';

const INITIAL_STATE = {
    submitting: false,
    userAvatar: null,
    bSMS6: undefined,
    bSMS7: undefined,
    bVerify6: undefined,
    bVerify7: undefined,
    mc_sms_old_verify: '', //old phone sms: type: 6
    mc_sms_new_verify: '', //old phone sms: type: 6

    mc_msg_old_verify:'',//new phone sms: type: 6
    mc_msg_new_verify:'',//new phone sms: type: 7

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

        case OLD_PHONE_VERIFY_SMS_SUCCESS:
        case OLD_PHONE_VERIFY_SMS_FAILURE:
            return {...state, mc_sms_old_verify: action.payload.msg, bSMS6: action.payload.status};

        case NEW_PHONE_VERIFY_SMS_SUCCESS:
        case NEW_PHONE_VERIFY_SMS_FAILURE:
            return {...state, mc_sms_new_verify: action.payload.msg, bSMS7: action.payload.status};

        case OLD_PHONE_VERIFY_SUCCESS:
        case OLD_PHONE_VERIFY_FAILURE:
            return {...state, mc_msg_old_verify: action.payload.msg, bVerify6: action.payload.status};

        case NEW_PHONE_VERIFY_SUCCESS:
        case NEW_PHONE_VERIFY_FAILURE:
            return {...state, mc_msg_new_verify: action.payload.msg, bVerify7: action.payload.status};

        case MOBILE_CHANGE_SUCCESS:
            return {...state, bChangedMC: true};
        case CHANGE_LOGIN_PASSWORD_SUCCESS:
            return {...state, bChangedPassword: true};

        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
