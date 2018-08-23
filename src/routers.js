import React from 'react';
import {Text, Button} from 'native-base';
import {StyleSheet, Image, View} from 'react-native';
import {Stack, Scene, Router, Actions} from 'react-native-router-flux';
import {Images} from '@common';
import { fromLeft } from 'react-navigation-transitions';


import {SplashScreen, Register, Login, Home, ForgottenVerify, ForgottenPassword, NewsList, NewsDetail,
NoticeList, NoticeDetail, Promotion, Prize, Loto, TotalMissions, BrowseTask,
    PreOrderMain,PendingOperation,CompletedTasks, RevokedTasks,
    VerifyMain, VerifyPassport
} from "@containers";

const RouterComponent = () => {
    renderBadge = ()=> {
        return (
            <Button light rounded onPress={()=> Actions.noticelist()}
                    style={{flexDirection: 'column', marginRight: 10, height: 30,width: 30, marginTop: 14, alignItems: 'center'}}>
                <Image source={Images.noticeIcon} style={{width: 24, height: 24}} />
            </Button>
        )
    };

    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Stack back key="missions123">
                    <Scene key="verifypassport1" component ={VerifyPassport} title="身份证信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>
                <Stack key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen}  />
                </Stack>
                <Stack key="auth">
                    <Scene key="login" component ={Login} title="欢迎来到拼金币"  titleStyle={styles.navigationBarTitleStyle} initial />
                    <Scene key="register" component ={Register} title="注册账号" titleStyle={styles.navigationBarTitleStyle} rightTitle=" " onRight={() => {}} />
                    <Scene key="forgottenverify" component ={ForgottenVerify} title="忘记密码" titleStyle={styles.navigationBarTitleStyle} rightTitle=" " onRight={() => {}} />
                    <Scene key="forgottenpassword" component ={ForgottenPassword} title="忘记密码" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}}/>
                </Stack>
                <Stack key="main" >
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
                    <Scene key="prize" component ={Prize} title="赚积分" titleStyle={styles.navigationBarTitleStyle}  rightTitle="积分记录" onRight={() => {}} />
                    <Scene key="loto" component ={Loto} title="积分抽奖" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>
                <Stack back key="news" transitionConfig={() => fromLeft(500)}>
                    <Scene key="newslist" component ={NewsList} title="公告" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="newsdetail"   component ={NewsDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="notice" transitionConfig={() => fromLeft(500)}>
                    <Scene key="noticelist" component ={NoticeList} title="系统消息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="noticedetail"   component ={NoticeDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="missions">
                    <Scene key="totalmissions" component ={TotalMissions} title="全部任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="browsetask" component ={BrowseTask} title="浏览任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle="打法师" onRight={() => {}} />
                </Stack>

                <Stack back key="preorders">
                    <Scene key="preordermain" component ={PreOrderMain} title="已接任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="unfinishedtasks" component ={PendingOperation} title="未完成垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="completedtask" component ={CompletedTasks} title="已完成垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="revokedtasks" component ={RevokedTasks} title="已撤销垫付任务" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <stack back key="verifystack">
                    <Scene key="verifymain" component ={VerifyMain} title="绑定信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="verifypassport" component ={VerifyPassport} title="身份证信息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
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
