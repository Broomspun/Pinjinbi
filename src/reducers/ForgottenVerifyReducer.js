import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS
} from "./../actions/types";

generatorCaptchaCode = (length) => {
    let result = [];
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        let char = possible.charAt(Math.floor(Math.random() * possible.length));
        result.push(char);
    }

    console.log('result', result.join(''));
    return result.join('')
};

const INITIAL_STATE = {
    fv_phone: '13612345678',
    fv_recaptchaMatch: '',
    fv_verifycode: '',
    fv_recaptchaCode: generatorCaptchaCode(4),
    loading: false,
    error: '',
};

export default (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {
        case FORGOTTEN_VERIFY_PARAMETER_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value }
        default:
            return state;
    }

}
