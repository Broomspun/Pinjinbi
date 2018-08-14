import React from 'react';
import {StyleSheet} from 'react-native';
import {Stack, Scene, Router} from 'react-native-router-flux';
import {SplashScreen, Register, Login, Home, ForgottenVerify, ForgottenPassword} from "@containers";


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component ={Login} title="欢迎来到拼金币" titleStyle={styles.navigationBarTitleStyle}  />
                    <Scene key="register" component ={Register} title="欢迎注册拼金币" titleStyle={styles.navigationBarTitleStyle}  />
                    <Scene key="forgottenverify" component ={ForgottenVerify} title="忘记密码" titleStyle={styles.navigationBarTitleStyle} initial />
                    <Scene key="forgottenpassword" component ={ForgottenPassword} title="忘记密码" titleStyle={styles.navigationBarTitleStyle} />
                </Scene>
                <Scene key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen}  />
                </Scene>
                <Scene key="main">
                    <Scene key="home" component ={Home} title="首页" titleStyle={styles.navigationBarTitleStyle} initial />
                </Scene>

            </Stack>
        </Router>
    );
};

const styles = StyleSheet.create({
    navigationBarTitleStyle: {
        // centering for Android
        flex: 1,
        textAlign: 'center'
    }
});

export default RouterComponent;
