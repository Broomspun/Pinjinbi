import {
    GET_NEWS_LIST
} from './../actions/types';


const INITIAL_STATE ={
    newslists: null
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case GET_NEWS_LIST:
            return {...state, newslists: action.payload};
        default:
            return state;
    }
}
