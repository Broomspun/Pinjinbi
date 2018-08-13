import React from 'react';
import {StyleSheet} from 'react-native';
import {Stack, Scene, Router} from 'react-native-router-flux';
import {SplashScreen, Register,Login} from "@containers";


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Scene key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen}  timeout={2000}  nextScene={'auth'}  />
                </Scene>
                <Scene key="auth">
                    <Scene key="login" component ={Login} title="欢迎来到拼金币" titleStyle={styles.navigationBarTitleStyle} initial />
                    <Scene key="register" component ={Register} title="欢迎注册拼金币" titleStyle={styles.navigationBarTitleStyle} />
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
