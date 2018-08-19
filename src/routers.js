import React from 'react';
import {Text, Button} from 'native-base';
import {StyleSheet, Image, View} from 'react-native';
import {Stack, Scene, Router, Actions} from 'react-native-router-flux';
import {Images} from '@common';
import { fromLeft } from 'react-navigation-transitions';


import {SplashScreen, Register, Login, Home, ForgottenVerify, ForgottenPassword, NewsList, NewsDetail,
NoticeList, NoticeDetail, Promotion
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
                </Stack>
                <Stack back key="news" transitionConfig={() => fromLeft(500)}>
                    <Scene key="newslist" component ={NewsList} title="公告" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="newsdetail"   component ={NewsDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>

                <Stack back key="notice" transitionConfig={() => fromLeft(500)}>
                    <Scene key="noticelist" component ={NoticeList} title="系统消息" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                    <Scene key="noticedetail"   component ={NoticeDetail} title="消息详情" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}} />
                </Stack>


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
