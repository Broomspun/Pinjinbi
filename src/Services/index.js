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
 @param UserId
 @param Token
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
 @param Mobile: current Phone number
 @param ImgCode: Captcha code
 @param VerifyType: 2 - Forgot password verification and get verification code parameters
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
 @param: Mobile: current Phone number
 @param: VerifyType: 2 - Forgot password verification and get verification code parameters
              6 - phone number verification and get verification code parameters,
              7 - Newly modify the phone number verification and get the verification code parameters
 @param: VerifyCode: Verify Code
 @param: UserId
 @param: Token
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
 @param NewMobile: current Phone number
 @param VerifyCode: Verify Code
 @param UserId
 @param Token
 **/
// @param VerifyType: 7 - Newly modify the phone number verification and get the verification code parameters
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
 3.9. 登录密码修改   (Change login password)
 http://pjbapi.wtvxin.com/api/Member/SubmitModifyByPassword
 POST
 @param UserId
 @param Token
 @param OldLoginPwd
 @param NewLoparam ginPwd
 **/
export const ChangePassword_API = async (UserId, Token, OldLoginPwd, NewLoginPwd)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/SubmitModifyByPassword`,
        `UserId=${UserId}&Token=${Token}&OldLoginPwd=${OldLoginPwd}&NewLoginPwd=${NewLoginPwd}`);
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
 * 4.0 佣金、本金页面和佣金、本金明细、积分明细 (Commission, principal page and commission, principal details , points details)
 * Get commission, principal page and commission, principal details
 * API: http://pjbapi.wtvxin.com/api/Money/GetWalletLogList
 *
 *@param UserId: Logged in User ID
 *@param Token:  Logged in User Token
 *@param Page: Current page number
 *@param PageSize: Number of pages per page
 *@param WalletType: Detail account type   0-- commission account, 1 -- principal account,  2 - points account
 *@param IsNewMonth: Page load is passed in 0 , 0 is for reading the current month data for paging, greater than 0 for reading all data for paging
 *@param Type: Currency type   0 balance   1 points (except for the points record, all pass 0 )
 *
 */
export const getWalletLogList_API = async (UserId, Token, Page, WalletType, IsNewMonth, Type, PageSize)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Money/GetWalletLogList`,
        `UserId=${UserId}&Token=${Token}&Page=${Page}&WalletType=${WalletType}&IsNewMonth=${IsNewMonth}&Type=${Type}&PageSize=${PageSize}`);
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
 *@param UserId : Logged in User ID
 *@param Token :  Logged in User Token
 *@param Avatar : base64 image)
 *
 */
export const submitAvatar_API = async (UserId, Token, Avatar)=>{

    const url = `${Constants.BASE_API_URL}/Member/EditHeadImage`;
    const data = {
        UserId: UserId,
        Token: Token,
        Avatar: Avatar
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
 *@param: UserID - Logged in User ID, integer
 *@param: Token -  Logged in User Token
 *@param: UserName, string
 *@param: Idcard : Card Number
 *@param: IdCardImgOne: Front photo, Base64 Image data
 *@param: IdCardImgTwo: Back photo, Base64 Image data
 *@param: IdCardImgThree, Base64 Image data
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
 *@param UserId : Logged in User ID, integer
 *@param Token :  Logged in User Token, string
 *@param BankName : Card Number, string
 *@param BankCardNo: stringparam:
 *@param BankAddress: string
 *@param BankCardName: string
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
 @param UserId integer
 @param Token string
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
 @param UserId integer
 @param Token string
 @param UserQQ string
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
 @param UserId integer
 @param Token string
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


/**
 7.2. 获取可以自己选择接单的任务列表，分页模式，下拉加载更多数据 (Get a list of tasks that you can choose to pick up orders, pagination mode, pull down to load more data)
 http://pjbapi.wtvxin.com/api/Task/GetTaskList
 POST
 @param UserId integer
 @param Token string
 @param Page integer
 @param MemberAcceptTaskStatus integer
 @param TaskType integer
 @param PageSize integer, optional
 **/
export const getTaskLists_API = async (UserId, Token,Page, MemberAcceptTaskStatus, TaskType, PageSize)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Task/GetTaskList`,
        `UserId=${UserId}&Token=${Token}&Page=${Page}&MemberAcceptTaskStatus=${MemberAcceptTaskStatus}&TaskType=${TaskType}&PageSize=${PageSize}` );

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
 7.7. 会员提交佣金提现申请
 http://pjbapi.wtvxin.com/api/Withdraw/CommCommissionWithdrawal
 POST
 @param UserId integer
 @param Token string
 @param WithdrawalAmount decimal
 @param LoginPassWord string
 **/
export const RequestCommissionWithdrawal_API = async (UserId, Token,WithdrawalAmount,LoginPassWord)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Withdraw/CommCommissionWithdrawal`,`UserId=${UserId}&Token=${Token}&WithdrawalAmount=${WithdrawalAmount}&LoginPassWord=${LoginPassWord}` );

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
 7.8. 支持格式
 http://pjbapi.wtvxin.com/api/Withdraw/PrincipalWithdrawal
 POST
 @param UserId integer
 @param Token string
 @param WithdrawalAmount decimal
 @param LoginPassWord string
 **/
export const RequestPrincipalWithdrawal_API = async (UserId, Token,WithdrawalAmount,LoginPassWord)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Withdraw/PrincipalWithdrawal`,`UserId=${UserId}&Token=${Token}&WithdrawalAmount=${WithdrawalAmount}&LoginPassWord=${LoginPassWord}` );

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
 * API LISTS
 *
 *   4.0 佣金、本金页面和佣金、本金明细、积分明细 (Commission, principal page and commission, principal details , points details)
 *       Get commission, principal, principal details
 *       url: Money/GetWalletLogList
 *       params: { UserId, Token, Page, PageSize, WalletType, IsNewMonth, Type}
 *          Page: Current page number
 *          PageSize: Number of pages per page
 *          WalletType: Detail account type   0-- commission account, 1 -- principal account,  2 - points account
 *          IsNewMonth: Page load is passed in 0 , 0 is for reading the current month data for paging, greater than 0 for reading all data for paging
 *          Type: Currency type   0 balance   1 points (except for the points record, all pass 0 )
 *
 *   7.2 url: Task/GetTaskList
 *       params: {UserId, Token, Page, PageSize, MemberAcceptTaskStatus, TaskType}
 *
 *   7.7 url: Withdraw/CommCommissionWithdrawal
 *       params: {(UserId, Token, WithdrawalAmount, LoginPassWord}
 *
 *   7.8 url: Withdraw/PrincipalWithdrawal
 *       params: {(UserId, Token, WithdrawalAmount, LoginPassWord}
 *
 */

/**
 POST
 @param url API Endpoint, string
 @param data, JSON Object
 **/
export const requestPOST_API = async (url, data)=>{

    url = `${Constants.BASE_API_URL}/${url}`;

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
    };

    let res = await axios(options);
    try {
        if(res.data.errcode ===0) {
            console.log('api result:', res);
            return  await {status: 200, data:res.data.obj};
        } else {
            return  await {status: res.data.errcode, msg:res.data.msg};
        }
    } catch (error) {
        return await {status: 404, data: null};
    }
};
