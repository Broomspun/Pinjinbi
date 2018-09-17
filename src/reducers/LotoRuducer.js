import {
GET_LOTO_ACTIVITIES_SUCCESS,
GET_LOTO_ACTIVITIES_FAIL,
GET_LOTO_ACTIVITIES_LOADING,
} from './../actions/types';

const INITIAL_STATE = {
    lotoObj: null,
    bLotoLoading: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOTO_ACTIVITIES_SUCCESS:
            return {...state, lotoObj : action.payload, bLotoLoading: false};
        case GET_LOTO_ACTIVITIES_FAIL:
            return {...state, lotoObj : null, bLotoLoading: false};
        case GET_LOTO_ACTIVITIES_LOADING:
            return {...state, bLotoLoading : true};
        default:
            return state;
    }
}
