import axios from 'axios';
import {GET_NOTICE_LIST} from "./types";


export const getNoticeLists = () => {
    return (dispatch) => {
        axios.get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=9d4791db08ba49828a0f638b57612274')
            .then( res => {
                dispatch({
                    type: GET_NOTICE_LIST,
                    payload: res.data.articles
                });
            });

    }
};
