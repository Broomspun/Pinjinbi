/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {drawSplashScreen} from "./../../actions"
import Timer from 'react-timer-mixin';
import {Images, Constants} from '@common';
import {View, Text, Image, Platform, UIManager,AsyncStorage} from 'react-native';
import {_retrieveUserData} from './../../Helper'
class SplashScreen extends Component {

    retrieveUserData = async () => {
        try {
            let user = await AsyncStorage.getItem('pjinbi_auth_user');
            if (user !== null) {
                console.log('fetched user', user);
                return user;
            } else {
                console.log('none user');
                Actions.auth();
            }
        } catch (error) {
            console.log('error');
        }
    };

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentDidMount() {
        Timer.setTimeout(async () => {
            let user = await this.retrieveUserData();
            console.log('user****',user);

            if(user)
                Actions.main({user: JSON.parse(user)});
            else
                Actions.auth();
        }, Constants.SplashScreen.Duration);
    }

    render() {
        return (
            <View style={styles.viewWrapper}>
                <View style={{flex: 1, width: null, height: null}} />
                <View style={styles.viewContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image style={{width: 44, height: 64}} source={Images.splashScreen}/>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.textLarge}>拼金币</Text>
                            <Text style={styles.textSmall}>www.pinjinbi.com</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: 22, color: '#292929'}}>做最赚钱的任务平台</Text>
                    </View>
                </View>
                <View style={{flex: 1, width: null, height: null, backgroundColor: 'white'}}>
                </View>
            </View>
        );
    }
}

const styles ={
    textLarge: {
        marginLeft: 15,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#5c91f0'
    },
    textSmall: {
        marginLeft: 15,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#9b9b9b'
    },
    viewWrapper:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    viewContainer: {
        flex: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: null,
        height: null
    }
};

const mapStoretoProps = (state) => {
    const {user} = state.loginForm;
    return { user };
};

export default connect(mapStoretoProps, {drawSplashScreen})(SplashScreen);
