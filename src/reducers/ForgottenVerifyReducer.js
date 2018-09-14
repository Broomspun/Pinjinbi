import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS,
    FORGOTTEN_LOADNIG,
} from "./../actions/types";

const INITIAL_STATE = {
    fv_phone: '18704153342',
    fv_verifycode: '',
    fv_recaptchaCode: '',
    loading: false,
    error: '',
    verified: false,
    verify_msg: '',
    verify_show: false,
    bForgottenLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORGOTTEN_VERIFY_PARAMETER_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value };
        case FORGOTTEN_VERIFY_FAIL:
            return {...state, verified: false,bForgottenLoading: false, verify_msg: action.payload, verify_show: true};
        case FORGOTTEN_VERIFY_SUCCESS:
            return {...state, verified: true,  bForgottenLoading: false, verify_msg: action.payload, verify_show: true};
        case FORGOTTEN_LOADNIG:
            return {...state, bForgottenLoading: true,};
        default:
            return state;
    }
}
