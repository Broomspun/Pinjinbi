import axios from 'axios';
import {Constants} from "@common";

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
});

export const request = async (url, data = {}) => {
    try {
        console.log(url);
        console.log(data);
        const response = await fetch(url, data);
        return await response.obj();
    } catch (err) {
        error(err);
        return {error: err};
    }
};


const PinjinbiAPI = {
    getBindingInfo: async (userId, Token)=>{

          await instance.post(`${Constants.BASE_API_URL}/Member/GetBindPageData`,`UserId=${userId}&Token=${Token}` )
            .then(res =>{
                if(res.data.errcode ===0) {
                    console.log('bind info', res,`${Constants.BASE_API_URL}/Member/GetBindPageData`,`UserId=${userId}&Token=${Token}` );
                    return {status: 200, data:res.data.obj};
                } else {
                    return  {status: res.data.errcode, msg:res.data.msg};
                }
            })
            .catch(() =>  loginUserFail(dispatch, 'Failed'));

    }
}

export default PinjinbiAPI;
