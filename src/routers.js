import React from 'react';
import {Text, Button} from 'native-base';
import {StyleSheet, Image, View} from 'react-native';
import {Stack, Scene, Router, Actions} from 'react-native-router-flux';
import {Images} from '@common';
import { fromLeft } from 'react-navigation-transitions';


import {SplashScreen, Register, Login, Home, ForgottenVerify, ForgottenPassword, NewsList, NewsDetail,
NoticeList, NoticeDetail, Promotion, PromotionAward, Prize, Loto, TotalMissions, BrowseTask,
    MyOrders, PendingOperation,CompletedTasks, RevokedTasks,
    VerifyMain, VerifyPassport,VerifyBanks,VerifyQQ,
    UserCenterMain,UserInfo,UserAvatar,VerifyOldPhone,ChangeOldToNewPhone,ChangeLoginPassword,IntegralRule,
    CommissionList,WithdrawalList,Withdrawal,WalletList,
    FaqMain, Faqs
} from "@containers";

renderBadge = ()=> {
    return (
        <Button light rounded onPress={()=> Actions.noticelist()}
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
                    {/*<Scene key="integralrule123" component ={IntegralRule} title="积分规则" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />*/}
                {/*</Stack>*/}
                <Stack key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen}  />
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
                <Stack back key="news" transitionConfig={() => fromLeft(500)} backButtonImage={Images.backButtonImg}>
                    <Scene key="newslist" component ={NewsList} title="公告" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="newsdetail"   component ={NewsDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="notice" transitionConfig={() => fromLeft(500)} backButtonImage={Images.backButtonImg}>
                    <Scene key="noticelist" component ={NoticeList} title="系统消息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="noticedetail"   component ={NoticeDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="missionsstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="totalmissions" component ={TotalMissions} title="全部任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="browsetask" component ={BrowseTask} title="浏览任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle="打法师" onRight={() => {}} />
                </Stack>

                <Stack back key="myordersstack" backButtonImage={Images.backButtonImg}>
                    <Scene key="myorders" component ={MyOrders} title="我的订单" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="unfinishedtasks" component ={PendingOperation} title="垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="completedtask" component ={CompletedTasks} title="已完成垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="revokedtasks" component ={RevokedTasks} title="已撤销垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
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

                <stack back key="verifystack" backButtonImage={Images.backButtonImg}>
                    <Scene key="verifymain" component ={VerifyMain} title="绑定信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifypassport" component ={VerifyPassport} title="身份证信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifybanks" component ={VerifyBanks} title="绑定银行账号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifyqq" component ={VerifyQQ} title="QQ号" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
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
