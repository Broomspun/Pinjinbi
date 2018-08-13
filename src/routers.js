import React from 'react';
import {StyleSheet} from 'react-native';
import {Stack, Scene, Actions, Router} from 'react-native-router-flux';
import {SplashScreen} from "@containers";
import {Login} from "@containers";


const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="login" component ={Login} title="欢迎来到拼金币" titleStyle={styles.navigationBarTitleStyle}  />
                </Scene>
                <Scene key="splash" hideNavBar>
                    <Scene key="splashscreen" component={SplashScreen} hideNavBar />
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
