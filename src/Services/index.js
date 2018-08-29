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
 * 4.6 Submit Member avatar
 * This API allows Member to submit his avatar
 * API: http://pjbapi.wtvxin.com/api/Member/EditHeadImage
 *
 *@UserID : Logged in User ID
 *@Token :  Logged in User Token
 *@Avatar : Avatar(base64 image)
 *
 */
export const submitAvatar_API = async (UserId, Token, Avatar)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/EditHeadImage`,`UserId=${UserId}&Token=${Token}&Avatar=${Avatar}` );

    try {
        if(res.data.errcode ===0) {
            console.log('avatar url', res.data.obj);
            return  await {status: 200, data:res.data.obj};
        } else {
            return  await {status: res.data.errcode, msg:res.data.msg};
        }
    } catch (error) {
        return await {status: 404, data: null};
    }
};
/**
 * 4.8 Submit UserID Card Info for binding
 * This API allows Member to submit User ID card Information for biding
 * API: http://pjbapi.wtvxin.com/api/Member/BindUserIdCard
 *
 *@UserID : Logged in User ID
 *@Token :  Logged in User Token
 *@UserNmae : User name
 *@Idcard : Card Number
 *@IdCardImgOne: Front photo
 *@IdCardImgTwo: Back photo
 *@IdCardImgThree:
 *
 */
export const submitIdCard_API = async (UserId,Token,UserName,Idcard, IdCardImgOne,IdCardImgTwo,IdCardImgThree)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/BindUserIdCard`,
        `UserId=${UserId}&Token=${Token}&UserRName=${UserName}&Idcard=${Idcard}&IdCardImgOne=${IdCardImgOne}&IdCardImgTwo=${IdCardImgTwo}&IdCardImgThree=${IdCardImgThree}`);
    try {
        console.log('api response', res);
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
 * 5.0 Submit Bank Info for binding
 * This API allows Member to submit User Bank Information for biding
 * API: http://pjbapi.wtvxin.com/api/Member/BindUserBank
 *
 *@UserID : Logged in User ID
 *@Token :  Logged in User Token
 *@BankName : Card Number
 *@BankCardNo: Front photo
 *@BankAddress: Back photo
 *@BankCardName: Back photo
 *
 */
export const submitBankInfo_API = async (UserId,Token,BankName,BankCardNo, BankAddress,BankCardName)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/BindUserBank`,
        `UserId=${UserId}&Token=${Token}&BankName=${BankName}&BankCardNo=${BankCardNo}&BankAddress=${BankAddress}&BankCardName=${BankCardName}`);
    try {
        console.log('api response', res);
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
export const submitQQInfo_API = async (UserId, Token, UserQQ)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/BindUserQQ`,`UserId=${UserId}&Token=${Token}&UserQQ=${UserQQ}` );

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

