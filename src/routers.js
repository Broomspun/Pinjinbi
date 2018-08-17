import React from 'react';
import {Text, Button} from 'native-base';
import {StyleSheet, Image, View} from 'react-native';
import {Stack, Scene, Router} from 'react-native-router-flux';
import {Images} from '@common';

import {SplashScreen, Register, Login, Home, ForgottenVerify, ForgottenPassword} from "@containers";

const renderBadge = ()=> {
    return (
        <Button transparent>
            <Image source={Images.noticeIcon} style={{width: 24, height: 22, marginTop: 10, marginRight: 10}} />
        </Button>
    )
};
const RouterComponent = () => {

    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Scene key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen}  />
                </Scene>
                <Scene key="auth">
                    <Scene key="login" component ={Login} title="欢迎来到拼金币"  titleStyle={styles.navigationBarTitleStyle} initial />
                    <Scene key="register" component ={Register} title="注册账号" titleStyle={styles.navigationBarTitleStyle} rightTitle=" " onRight={() => {}} />
                    <Scene key="forgottenverify" component ={ForgottenVerify} title="忘记密码" titleStyle={styles.navigationBarTitleStyle} renderRightButton={<View></View>} />
                    <Scene key="forgottenpassword" component ={ForgottenPassword} title="忘记密码" titleStyle={styles.navigationBarTitleStyle}  rightTitle=" " onRight={() => {}}/>
                </Scene>
                <Scene key="main">
                    <Scene key="home" component ={Home} title="首页" titleStyle={styles.navigationBarTitleStyle} renderLeftButton={<View></View>} renderRightButton={renderBadge()} initial />
                </Scene>

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
