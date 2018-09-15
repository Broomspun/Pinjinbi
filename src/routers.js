import React from 'react';
import {Text, Button} from 'native-base';
import {StyleSheet, Image, View} from 'react-native';
import {Stack, Scene, Router, Actions} from 'react-native-router-flux';
import {Images} from '@common';
import { fromLeft } from 'react-navigation-transitions';

import {SplashScreen, Register, Login, Home, ForgottenVerify, ForgottenPassword, AnnounceMessagesList,AnnounceMessageDetail,
    SystemMessagesList, SystemMessageDetail, Promotion, PromotionAward, Prize, Loto, TotalMissions, BrowseTask,
    MyOrders, AdvancedOrders,BrowseOrders,
    VerifyMain, VerifyPassport,VerifyBanks,VerifyQQ,
    TabaoMain,BindTabaoAccount,JingDongMain,BindJingDongAccount,PinDuoDuoMain,BindPinDuoDuoAccount,
    MushroomStreetMain, BindMushroomStreetAccount,BeautifulMain,BindBeautifulAccount,
    VIPMain,
    BeginnersMain,Details,
    UserCenterMain,UserInfo,UserAvatar,VerifyOldPhone,ChangeOldToNewPhone,ChangeLoginPassword,IntegralRule,
    CommissionList,WithdrawalList,Withdrawal,WalletList,
    FaqMain, Faqs
} from "@containers";


const renderBadge = ()=> {
    return (
        <Button light rounded onPress={()=> Actions.systemMessagesList()}
                style={{flexDirection: 'column', marginRight: 10, height: 30,width: 30, marginTop: 14, alignItems: 'center'}}>
            <Image source={Images.noticeIcon} style={{width: 24, height: 24}} />
        </Button>
    )
};

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root"  hideNavBar>
                {/*<Stack back key="missions123" backButtonImage={Images.backButtonImg}>*/}
                    {/*<Scene key="integralrule123" component ={TabaoMain} title="积分规则" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />*/}
                {/*</Stack>*/}
                <Stack back key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen}  hideNavBar />
                </Stack>
                <Stack key="main" backButtonImage={Images.backButtonImg}>
                    <Scene key="home"
                           component ={Home}
                           title="首页"
                           titleStyle={styles.navigationBarTitleStyle}
                           leftTitle=" "
                           onLeft={() => {}}
                           renderRightButton={renderBadge()}
                           initial
                    />
                    <Scene key="promotion" component ={Promotion} title="推广赚金" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="promotionaward" component ={PromotionAward} title="推广赚金" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="prize" component ={Prize} title="赚积分" titleStyle={styles.navigationBarTitleStyle}  rightTitle="积分记录" onRight={() => {}} />
                    <Scene key="loto" component ={Loto} title="积分抽奖" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>
                <Stack key="auth" backButtonImage={Images.backButtonImg}>
                    <Scene key="login" component ={Login} title="欢迎来到拼金币"  titleStyle={styles.navigationBarTitleStyle} />
                    <Scene key="register" component ={Register} title="注册账号" titleStyle={styles.navigationBarTitleStyle} rightTitle=" " onRight={() => {}} />
                    <Scene key="forgottenverify" component ={ForgottenVerify} title="忘记密码" titleStyle={styles.navigationBarTitleStyle} rightTitle=" " onRight={() => {}} />
                    <Scene key="forgottenpassword" component ={ForgottenPassword} title="忘记密码" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}}/>
                </Stack>
                <Stack back key="systemmessages" transitionConfig={() => fromLeft(500)} backButtonImage={Images.backButtonImg}>
                    <Scene key="systemMessagesList" component ={SystemMessagesList} title="系统消息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="systemMessageDetail" component ={SystemMessageDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="announceMessages" transitionConfig={() => fromLeft(500)} backButtonImage={Images.backButtonImg}>
                    <Scene key="announceMessagesList" component ={AnnounceMessagesList} title="公告" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="announceMessageDetail"   component ={AnnounceMessageDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="missionsstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="totalmissions" component ={TotalMissions} title="全部任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="browsetask" component ={BrowseTask} title="浏览任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle="打法师" onRight={() => {}} />
                </Stack>

                <Stack back key="myordersstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="myorders" component ={MyOrders} title="我的订单" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="advancedorders" component ={AdvancedOrders} title="垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="browseorders" component ={BrowseOrders} title="浏览任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>
                <stack back key="usercenterstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="usercentermain" component ={UserCenterMain} title="我" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="usercenterinfo" component ={UserInfo} title="账号信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="UserAvatar" component ={UserAvatar} title="头像" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifyoldphone" component ={VerifyOldPhone} title="手机号修改" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="changeoldtonewphone" component ={ChangeOldToNewPhone} title="手机号修改" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="changeloginpassword" component ={ChangeLoginPassword} title="修改登录密码" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="integralrule" component ={IntegralRule} title="积分规则" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="commissionlist" component ={CommissionList} title="佣金收益" titleStyle={styles.navigationBarTitleStyle}  rightTitle="提现" onRight={() => Actions.withdrawal({wallettype: 1})} />
                    <Scene key="withdrawallist" component ={WithdrawalList} title="佣金提现记录" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="withdrawal" component ={Withdrawal} title="佣金提现" titleStyle={styles.navigationBarTitleStyle}  rightTitle="查看明细" onRight={() => Actions.withdrawallist()} />
                    <Scene key="walletlist" component ={WalletList} title="本金总计" titleStyle={styles.navigationBarTitleStyle}  rightTitle="提现" onRight={() => Actions.withdrawal({wallettype: 2})} />
                </stack>

                <stack back key="vipstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="vipMain" component ={VIPMain} title="加入VIP" titleStyle={styles.navigationBarTitleStyle}  rightTitle="提现" onRight={() => Actions.withdrawal({wallettype: 2})} />
                </stack>

                <stack back key="beginnerstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="BeginnersMain" component ={BeginnersMain} title="账号管理" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="Details" component ={Details} title="详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </stack>

                <stack back key="verifystack" backButtonImage={Images.backButtonImg}>
                    <Scene key="verifymain" component ={VerifyMain} title="绑定信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifypassport" component ={VerifyPassport} title="身份证信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifybanks" component ={VerifyBanks} title="绑定银行账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifyqq" component ={VerifyQQ} title="QQ号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="TabaoMain" component ={TabaoMain} title="绑定淘宝账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="bindTabaoAccount" component ={BindTabaoAccount} title="绑定淘宝账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="JingDongMain" component ={JingDongMain} title="绑定京东账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="bindJingDongAccount" component ={BindJingDongAccount} title="绑定京东账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="PinDuoDuoMain" component ={PinDuoDuoMain} title="绑定拼多多账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="bindPinDuoDuoAccount" component ={BindPinDuoDuoAccount} title="绑定拼多多账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="MushroomStreetMain" component ={MushroomStreetMain} title="绑定蘑菇街账户" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="bindMushroomStreetAccount" component ={BindMushroomStreetAccount} title="绑定蘑菇街账户" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="BeautifulMain" component ={BeautifulMain} title="绑定美丽说账户" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="bindBeautifulAccount" component ={BindBeautifulAccount} title="绑定美丽说账户" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </stack>
                <stack back key="faqstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="faqmain" component ={FaqMain} title="常见问题" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="faqs" component ={FaqMain} title="任务类型" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </stack>
            </Stack>
        </Router>
    );
};

const styles = StyleSheet.create({
    navigationBarTitleStyle: {
        // centering for Android
        flex: 1,
        textAlign: 'center',
    }
});

export default RouterComponent;
