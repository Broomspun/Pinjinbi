import {
    SUBMIT_TABAO_ACCOUNT_SUCCESS, SUBMIT_TABAO_ACCOUNT_FAILURE, SUBMIT_TABAO_ACCOUNT_LOADING,
    GET_PLATFORM_INFO_SUCCESS, GET_PLATFORM_INFO_FAILURE, GET_PLATFORM_INFO_LOADING,
    GET_PLATFORM_LISTS_SUCCESS, GET_PLATFORM_LISTS_FAILURE, GET_PLATFORM_LISTS_LOADING,
    GET_SHOPPING_CATEGORIES_SUCCESS, GET_SHOPPING_CATEGORIES_FAILURE, GET_SHOPPING_CATEGORIES_LOADING,
} from "./types";


import { requestPOST_API, requestGET_API} from "../Services";

export const submitPlatformAccount = (UserId, Token,PlatId,ProvinceCode, CityCode, DistrictCode,
                                   ConsigneeCall,ConsigneeName, PlatAccount, Address,
                                   Gender, Age
                                   )=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_TABAO_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/BindOnAccount',
                {UserId: UserId, Token: Token,PlatId:PlatId,
                    ProvinceCode: ProvinceCode, CityCode: CityCode, DistrictCode:DistrictCode,
                    ConsigneeCall:ConsigneeCall,ConsigneeName: ConsigneeName, PlatAccount: PlatAccount,
                    Address: Address,Gender: Gender, Age: Age
                }
            );

            if(res.status===200) {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};

export const submitTaobaoAccount = (UserId, Token,PlatId,ProvinceCode, CityCode, DistrictCode,
                                      ConsigneeCall,ConsigneeName, PlatAccount, Address,
                                      Gender, Age, TaobaoValue,CreditRating, OrderNo,ConsumerCategoryList,
                                    CreditRatingImg, TaobaoValueImg, VerifiedImg, BorrowingImg)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_TABAO_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/BindOnAccount',
                {UserId: UserId, Token: Token,PlatId:PlatId,
                    ProvinceCode: ProvinceCode, CityCode: CityCode, DistrictCode:DistrictCode,
                    ConsigneeCall:ConsigneeCall,ConsigneeName: ConsigneeName, PlatAccount: PlatAccount,
                    Address: Address,Gender: Gender, Age: Age, TaobaoValue: TaobaoValue,
                    CreditRating: CreditRating, OrderNo: OrderNo,ConsumerCategoryList: ConsumerCategoryList,
                    CreditRatingImg: CreditRatingImg, TaobaoValueImg: TaobaoValueImg, VerifiedImg: VerifiedImg, BorrowingImg: BorrowingImg
                }
            );

            if(res.status===200) {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};

export const submitJinDongAccount = (UserId, Token,PlatId,ProvinceCode, CityCode, DistrictCode,
                                    ConsigneeCall,ConsigneeName, PlatAccount, Address,
                                    Gender, Age, AccountLevel,
                                     UserCenterImg, AccountLevelImg, VerifiedImg, BorrowingImg)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_TABAO_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/BindOnAccount',
                {UserId: UserId, Token: Token,PlatId:PlatId,
                    ProvinceCode: ProvinceCode, CityCode: CityCode, DistrictCode:DistrictCode,
                    ConsigneeCall:ConsigneeCall,ConsigneeName: ConsigneeName, PlatAccount: PlatAccount,
                    Address: Address,Gender: Gender, Age: Age, AccountLevel: AccountLevel,
                UserCenterImg: UserCenterImg, AccountLevelImg: AccountLevelImg, VerifiedImg: VerifiedImg, BorrowingImg: BorrowingImg
                }
            );

            if(res.status===200) {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};

export const submitPinDuoDuoAccount = (UserId, Token,PlatId,ProvinceCode, CityCode, DistrictCode,
                                     ConsigneeCall,ConsigneeName, PlatAccount, Address,
                                     Gender, Age, OrderNo, UserCenterImg, CreditRatingImg)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_TABAO_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/BindOnAccount',
                {UserId: UserId, Token: Token,PlatId:PlatId,
                    ProvinceCode: ProvinceCode, CityCode: CityCode, DistrictCode:DistrictCode,
                    ConsigneeCall:ConsigneeCall,ConsigneeName: ConsigneeName, PlatAccount: PlatAccount,
                    Address: Address,Gender: Gender, Age: Age,
                    OrderNo: OrderNo, UserCenterImg: UserCenterImg, CreditRatingImg: CreditRatingImg
                }
            );

            if(res.status===200) {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};

export const submitBeautifulAccount = (UserId, Token,PlatId,ProvinceCode, CityCode, DistrictCode,
                                       ConsigneeCall,ConsigneeName, PlatAccount, Address,
                                       Gender, Age, UserInfoImg)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_TABAO_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/BindOnAccount',
                {UserId: UserId, Token: Token,PlatId:PlatId,
                    ProvinceCode: ProvinceCode, CityCode: CityCode, DistrictCode:DistrictCode,
                    ConsigneeCall:ConsigneeCall,ConsigneeName: ConsigneeName, PlatAccount: PlatAccount,
                    Address: Address,Gender: Gender, Age: Age,UserInfoImg: UserInfoImg
                }
            );

            if(res.status===200) {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_TABAO_ACCOUNT_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};


export const getPlatformLists = () => {
    return (dispatch) => {
        dispatch({type: GET_PLATFORM_LISTS_LOADING}); //for Spinner;
        (async ()=>{
            let res = await requestGET_API('Task/GetPlatList');

            if(res.status===200) {
                dispatch({
                    type: GET_PLATFORM_LISTS_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            }
            else {
                dispatch({
                    type: GET_PLATFORM_LISTS_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};

export const getMemberPlatformInfo = (UserId, Token, PlatId) => {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_PLATFORM_INFO_LOADING}); //for Spinner;
            let res = await requestPOST_API('Member/LoadMemberAccountList',
                {UserId: UserId, Token: Token,PlatId:PlatId}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_PLATFORM_INFO_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_PLATFORM_INFO_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};


export const getAllShoppingCategories = () => {
    return (dispatch) => {
        dispatch({type: GET_SHOPPING_CATEGORIES_LOADING}); //for Spinner;
        (async ()=>{
            let res = await requestGET_API('Member/GetALLShoppingCategory');

            if(res.status===200) {
                dispatch({
                    type: GET_SHOPPING_CATEGORIES_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            }
            else {
                dispatch({
                    type: GET_SHOPPING_CATEGORIES_FAILURE,
                    payload: {msg: res.msg}
                });
            }
        })();
    };
};
