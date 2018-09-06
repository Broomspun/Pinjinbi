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
 *@param: UserRName, string
 *@param: Idcard : Card Number
 *@param: IdCardImgOne: Front photo, Base64 Image data
 *@param: IdCardImgTwo: Back photo, Base64 Image data
 *@param: IdCardImgThree, Base64 Image data
 */
export const submitIdCard_API = async (UserId,Token,UserRName,Idcard, IdCardImgOne,IdCardImgTwo,IdCardImgThree)=>{
    let res = await instance.post(`${Constants.BASE_API_URL}/Member/BindUserIdCard`,
        `UserId=${UserId}&Token=${Token}&UserRName=${UserRName}&Idcard=${Idcard}&IdCardImgOne=${IdCardImgOne}&IdCardImgTwo=${IdCardImgTwo}&IdCardImgThree=${IdCardImgThree}`);
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
 *   4.1. Submit a reset login password
 *   url:Member/SubmitResetLoginPwd
 *   type:post
 *   params:{Mobile,NewLoginPwd}
 *         NewLoginPwd: Reset login password value
 *
 *   4.2. Get a list of all VIP packages
 *   url: Money/GetVIPList
 *   type: get
 *   params{}
 *
 *   4.3. Purchase VIP and verify
 *   url: Money/UserBuyVIP
 *   type: post
 *   params:{UserId,Token,SetMealId}
 *          UserId: Id returned by the user after login , int, Yes
 *          Token: '',string ,yest
 *          SetMealId: 'Confirm the package ID of the purchase' , int , yes
 *
 *
 *   4. 4 . Sign in page load earn points
 *          url: Integral/LoadSignInPage
 *          type: post
 *          params:{UserId , Token}
 *
 *   4.5 .Member sign in to get points
 *          url: Integral/SignInGetPoints
 *          type: post
 *          params: {UserId , Token}
 *
 *   4.6. Member changes avatar
 *          url: Member/EditHeadImage
 *          type: post
 *          params: {UserId, Token, Avatar}
 *          ...
 *          Avatar: Modified avatar image , base64 bit image stream
 *
 *
 *   4.7  http://pjbapi.wtvxin.com/api/Member/GetUserBindIdCardInfo
 *        params: { UserId, Token}
 *   4.8 会员身份证绑定提交 (Member ID binding submission)
 *       url: Member/BindUserIdCard
 *       params: { UserId, Token, UserRName, Idcard, IdCardImgOne, IdCardImgTwo, IdCardImgThree }

 *    4. 9 . Member bank card binding information page to load
 *          url: Member/GetUserBankInfo
 *          type: post
 *          params:{UserId , Token}
 *
 *
 *     5.0 . Member submits bank card binding
 *          url: Member/BindUserBank
 *          type: post
 *          params:{UserId,Token, BANKNAME, BankCardNo, bankaddress , BankCardName}
 *                  BANKNAME : Bank name  , string, Yes
 *                  BankCardNo : Bank card number , string , yes
 *                  bankaddress: Bank details , string, Yes
 *                  BankCardName : The cardholder's name and member Real name the same , string, Yes
 *
 *
 *     5.1. Member Q Q binding page loading
 *          url: Member/GetUserQQInfo
 *          type: post
 *          params: {UserId , Token}
 *
 *
 *     5.2. Member submits Q Q binding
 *          url: Member/BindUserQQ
 *             type: post
 *          params: {UserId , Token , UserQQ}
 *              UserQQ: Member fills in the bound QQ number , string ,Yes
 *
 *
 **********************Failure**********
 * ###    5.3. Obtain provincial and municipal data
 * ###         url: Member/GetAreaList
 * ###         type: post
 * ###         params: {AreaType,AreaCode }
 * ###                 AreaType : Passed value of Province , String , Yes
 * ###                 AreaCode : Upper area code , String, Yes
 ******************************************
 *
 *    5.4. Obtaining the data of the binding information page
 *          url:   Member/GetBindPageData
 *          type: post
 *          params: {UserId , Token}
 *
 *
 *    5.5. Obtaining the account list page page loading of a certain platform
 *          url:    Member/LoadMemberAccountList
 *          type: post
 *          params: {UserId , Token,tender}
 *              tender: Selected platform Id  , int , yes
 *
 *    5.6. View details of a bound account
 *          url: Member/LoadMemberAccountInfo
 *          type: post
 *          params: {UserId , Token}
 *
 *
 *    5.7. Submitting the account binding of the platform
 *          url: Member/BindOnAccount
 *          type:  post
 *          params: {UserId,Token, tender,PlatAccount,ConsigneeName,ConsigneeCall,ProvinceCode,CityCode,DistrictCode,Address,Gender,Age, TaobaoValue,CreditRating,AccountLevel,OrderNo,ConsumerCategoryList,CreditRatingImg,UserInfoImg,UserCenterImg,TaobaoValueImg,AccountLevelImg,VerifiedImg,BorrowingImg}
 *                  PlatAccount: Filled in the platform account , string, yes
 *                  ConsigneeName: Consignee name , string ,  yes.
 *                  ConsigneeCall: Consignee contact number , string , yes
 *                  ProvinceCode : Province Code value (code ) , string , yes
 *                  CityCode: Urban Code Value (Code ) , string , yes
 *                  DistrictCode: District code value (code ) , string, yes
 *                  Address: address, string, yes
 *                  Gender: gender, string, Yes
 *                  Age: age,int, yes
 *                  .....
 *                  *others parameter:  string , According to the account to confirm whether the binding of different platforms is required item , if the page binding exists when the need to fill was required items
 *
 *
 *   5.8. Get all shopping categories when the account is bound
 *           url: Member/GetALLShoppingCategory
 *           type: get
 *
 *
 *   5.9. Get a list of all platforms for the system
 *           url: Task/GetPlatList
 *           type: get
 *
 *
 *   6.0 . Get the user can receive the account
 *           url: Task/GetMemberCanReceiveAccount
 *           type: post
 *           params:{UserId,Token, tender, TaskType}
 *                   TaskType: Order task type: 1 - Advance mission 2- Browse tasks , yes
 *
 *
 *   6.1. Select the task list of your own order to get
 *           url: Task/GetTaskList
 *           type: post
 *           params: {UserId , Token, Page, PageSize, AccountId , tender, MaxAdvancePayMoney,TaskType}
 *                   Page: current page number , int , yes
 *                   PageSize: Number of pages per page , int , yes
 *                   AccountId: User selected order account ID , int , yes
 *                   MaxAdvancePayMoney: The maximum amount of advance payment for member order conditions , int , yes
 *                   TaskType: Order task type: 1 - Advance mission 2- Browse tasks , yes
 *
 *
 *    6.2. Manual order, create a member order task record
 *           url: Task/UserDetermineTask
 *           type: post
 *           params: {UserId , Token, AccountId , TaskListNo}
 *               TaskListNo: Assigned task number , string, yes
 *
 *
 *
 *    6.3. Select the task operation page to load after the order is successfully received .
 *           url:   Task/GetMemberTaskAccept
 *           type: post
 *           params: {UserId , Token, TaskAcceptNo}
 *                 TaskAcceptNo: Order number , string, yes
 *
 *
 *    6. 4 . Operational tasks page data load (ie task details)
 *            url:    Task/LoadOperationalTask
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo}
 *
 *
 *    6. 5 . Verify the merchant platform shop name
 *            url: Task/VerifyShopName
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo,Shopname}
 *                    Shopname: Verified store name , string ,  yes
 *
 *
 *    6. 6 . Submit jobs
 *            url: Task/SubmitTask
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo,ImgJson,PlatOrderNo}
 *                ImgJson: Task all picture collection Json , string , yes
 *                PlatOrderNo: Order number placed by the platform TaskType==1-> Required for advancement task  == TaskType 2 > - browse when the task is not filled  , string , No
 *
 *    6. 7 . Members reminder ( reminders ) rebate
 *            url: Task/RemindingRefunds
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo}
 *
 *
 *    6. 8 . Members confirm receipt, to complete the task
 *            url: Task/CompleteTask
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo,OkImgJson}
 *                OkImgJson: Task collection of completed tasks, string , yes
 *
 *
 *    6. 9 . Member cancel orders mission
 *            url: Task/CancelTask
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo,TaskCancelReasons}
 *                TaskCancelReasons: Reason for the member to cancel the task (text information) , string , yes
 *
 *    7.0. Get all appeal types
 *            url: Task/GetApplyStatementType
 *            type:get
 *
 *    7.1. Member application for appeal
 *            url: Task/InitiateAppeal
 *            type: post
 *            params: {UserId , Token, TaskAcceptNo,AppealTypeId,AppealMsg,QuestionImgF,QuestionImgS,QuestionImgT}
 *                AppealTypeId: Appeal Type Id , int , yes
 *                AppealMsg : Reason for appeal , string, Yes
 *                QuestionImgF: Appeal Figure 1 (base64 image stream ) , string ,No
 *                QuestionImgS: Appeal Figure 2 (base64 image stream ) , string ,No
 *                QuestionImgT: Appeal Figure 3 (base64 image stream ) , string ,No*
 *
 *
  *
 *   7.2 url: Task/GetMemberTaskList
 *       params: {UserId, Token, Page, PageSize, MemberAcceptTaskStatus, TaskType}

 *
 *   7.3. Obtain a list of data according to different complainants
 *          url: Appeal/GetAppealListPage
 *          type: post
 *          params: {UserId, Token, Page,PageSize,Complainant}
 *
 *   7.4. View grievance details
 *          url: Appeal/GetAppealInfo
 *          params: { UserId, Token,AppealId}
 *
 *   7.5. Initiating platform involvement
 *          url: Appeal/InitiatePlatformInvolvement
 *          params: {UserId, Token,AppealId}
 *
 *   7.6. Cashing page binding data loading
 *          url: Withdraw/LoadingWithdrawPage
 *          params: { UserId, Token}
 *
 *   7.7 url: Withdraw/CommCommissionWithdrawal
 *       params: {(UserId, Token, WithdrawalAmount, LoginPassWord}
 *
 *   7.8 url: Withdraw/PrincipalWithdrawal
 *       params: {(UserId, Token, WithdrawalAmount, LoginPassWord}
 *
 *   7.9 . Paging records acquired withdrawals
 *          url: Withdraw/GetWithdrawLogPage
 *          params: {UserId, Token,Page,PageSize,WalletType}
 *
 *   8.0. Get all appeal types
 *          url: Help/GetAllHelpClass
 *          type: get
 *
 *    8.1 . Paging to get a list of frequently asked questions
 *          url: Help/GetHelpList
 *          type: post
 *          params: {HelpClassId,Page,PageSize,SarchKeyword}
 *
 *    8.2. Paging to get system messages , announcement lists
 *          url: Notice/GetNoticeByMember
 *          type: post
 *          params: {UserId , Token, Page, PageSize , sendtype}
 *
 *    8.3. Read system messages or announcement details
 *          url: Notice/GetNoticeByMember
 *          type: post
 *          params: {UserId , Token , NoticeId}
 *
 *    8.4. Get member promotion page data
 *          url: Notice/GetNoticeByMember
 *          type: post
 *          params: {UserId , Token}
 */

/**
 POST
 @param url API Endpoint, string
 @param data, JSON Object
 **/
export const requestPOST_API = async (url, data, method='POST')=>{

    url = `${Constants.BASE_API_URL}/${url}`;

    const options = {
        method: method,
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
