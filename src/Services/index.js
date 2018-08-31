import axios from 'axios';
import {Constants} from "@common";
import {AsyncStorage} from "react-native";
import {Actions} from "react-native-router-flux";
import qs from 'qs';

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    maxContentLength: 2000000,

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
 3.6. 验证、修改手机号获取验证码  (obtain the verification code to change the mobile phone number.)
 http://pjbapi.wtvxin.com/api/Member/GetSms
 POST
 @Mobile: current Phone number
 @ImgCode: Captcha code
 @VerifyType: 2 - Forgot password verification and get verification code parameters
              6 - phone number verification and get verification code parameters,
              7 - Newly modify the phone number verification and get the verification code parameters
 **/
export const getVerifySMSCode_API = async (Mobile, VerifyType, ImgCode)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/GetSms`, `Mobile=${Mobile}&VerifyType=${VerifyType}&ImgCode=${ImgCode}`);
console.log('api_result', res);
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
 3.7. 验证码与手机号验证   (Verify verification code & Mobile number to change the mobile phone number.)
 http://pjbapi.wtvxin.com/api/Member/VerificationMobile
 POST
 @Mobile: current Phone number
 @VerifyType: 2 - Forgot password verification and get verification code parameters
              6 - phone number verification and get verification code parameters,
              7 - Newly modify the phone number verification and get the verification code parameters
 @VerifyCode: Verify Code
 @UserId
 @Token
 **/
export const VerifyMC_API = async (Mobile, VerifyType, VerifyCode, UserId, Token)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/VerificationMobile`,
        `Mobile=${Mobile}&VerifyType=${VerifyType}&VerifyCode=${VerifyCode}&UserId=${UserId}&Token=${Token}`);
    console.log('api_result', res);
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
 3.8. 提交手机号修改   (Change Mobile Phone number.)
 http://pjbapi.wtvxin.com/api/Member/SubmitModifyByMobile
 POST
 @NewMobile: current Phone number
 @VerifyType: 7 - Newly modify the phone number verification and get the verification code parameters
 @VerifyCode: Verify Code
 @UserId
 @Token
 **/
export const ChangeMP_API = async (NewMobile, VerifyCode, UserId, Token)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/SubmitModifyByMobile`,
        `NewMobile=${NewMobile}&VerifyType=7&VerifyCode=${VerifyCode}&UserId=${UserId}&Token=${Token}`);
    console.log('api_result', res);
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

    const url = `${Constants.BASE_API_URL}/Member/EditHeadImage`;
    const data = {
        UserId: UserId,
        Token:Token,
        Avatar:Avatar
    };

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
    };

    let res = await axios(options);
    try {
        if(res.data.errcode ===0) {
            console.log('avatar url', res);
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

