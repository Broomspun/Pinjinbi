import {SPLASH_SCREEN_DRAWN} from "../actions/types";

const INITIAL_STATE = {
    loading: false
};


export default (state={INITIAL_STATE}, action) => {
    switch (action.type) {
        case SPLASH_SCREEN_DRAWN:
            return {...state, loading: true};
        default:
            return state;
    }
};
