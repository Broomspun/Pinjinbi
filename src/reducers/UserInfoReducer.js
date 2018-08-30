import {
    AVATAR_SUCCESS,
    AVATAR_SUBMIT,
    AVATAR_CHANGED
} from './../actions/types';

const INITIAL_STATE = {
    submitting: false,
    userAvatar: null
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
        default:
            return state;
    }
}
