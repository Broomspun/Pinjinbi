import axios from 'axios';
import {Constants} from "@common";
import {AsyncStorage} from "react-native";
import {Actions} from "react-native-router-flux";

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
});

export const _retrieveUserData = async () => {
    try {
        let user = await AsyncStorage.getItem('pjinbi_auth_user');
        if (user !== null) {
            return await user;
        } else {
            console.log('none user');
            Actions.auth();
        }
    } catch (error) {
        console.log('error');
    }
};

export const getBindingInfo1 = async (userId, Token)=>{

      instance.post(`${Constants.BASE_API_URL}/Member/GetBindPageData`,`UserId=${userId}&Token=${Token}` )
        .then(res =>{
            if(res.data.errcode ===0) {
                return  {status: 200, data:res.data.obj};
            } else {
                return  {status: res.data.errcode, msg:res.data.msg};
            }
        })
        .catch(() =>  console.log('Failed'));

};
/**
 3.4. 个人中心首页 (Personal Center Homepage)
 http://pjbapi.wtvxin.com/api/Login/GetMemberInfo?
 GET
 @UserId
 @Token
 **/
export const getMemberInfo = async (UserId, Token)=>{
    let res = await instance.get(`http://pjbapi.wtvxin.com/api/Login/GetMemberInfo?UserId=${UserId}&Token=${Token}`);

    try {
        if(res.data.errcode ===0) {
            return  await {status: 200, data:res.data.obj};
        } else {
            return  await {status: res.data.errcode, msg:res.data.msg};
        }
    } catch (error) {
        return await {status: 404, data: null};
    }
};

/**
 5.1. 会员QQ号绑定页面加载
 http://pjbapi.wtvxin.com/api/Member/GetUserQQInfo
 POST
 @UserId
 @Token
 **/
export const getQQInfo = async (UserId, Token)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/GetUserQQInfo`,`UserId=${UserId}&Token=${Token}` );

    try {
        if(res.data.errcode ===0) {
            return  await {status: 200, data:res.data.obj};
        } else {
            return  await {status: res.data.errcode, msg:res.data.msg};
        }
    } catch (error) {
        return await {status: 404, data: null};
    }
};

/**
 5.2. 会员提交QQ号绑定
 http://pjbapi.wtvxin.com/api/Member/BindUserQQ
 POST
 @UserId
 @Token
 @UserQQ
 **/

/**
 5.4. 获取绑定信息页面的数据
 http://pjbapi.wtvxin.com/api/Member/GetBindPageData
 POST
 @UserId
 @Token
**/
export const getBindingInfo = async (UserId, Token)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/GetBindPageData`,`UserId=${UserId}&Token=${Token}` );

    try {
        if(res.data.errcode ===0) {
            return  await {status: 200, data:res.data.obj};
        } else {
            return  await {status: res.data.errcode, msg:res.data.msg};
        }
    } catch (error) {
        return await {status: 404, data: null};
    }
};


export const requestInfo = async (url, UserId, Token) => {
    let res = await instance.post(`${Constants.BASE_API_URL}/${url}`,`UserId=${UserId}&Token=${Token}` );
    try {
        if(res.data.errcode ===0) {
            return  await {status: 200, data:res.data.obj};
        } else {
            return  await {status: res.data.errcode, msg:res.data.msg};
        }
    } catch (err) {
        error(err);
        return await {status: 404, data: null};
    }
};

