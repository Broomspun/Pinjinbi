import axios from 'axios';
import {GET_NEWS_LIST} from "./types";

export const getNewsLists = () => {
    return (dispatch) => {
        axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9d4791db08ba49828a0f638b57612274')
            .then( res => {
                dispatch({
                    type: GET_NEWS_LIST,
                    payload: res.data.articles
                });
            });

    }
};
