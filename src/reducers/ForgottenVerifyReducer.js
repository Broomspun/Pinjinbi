import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS
} from "./../actions/types";


const INITIAL_STATE = {
    fv_phone: '13612345678',
    fv_recaptcha: '',
    fv_verifycode: '',
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
