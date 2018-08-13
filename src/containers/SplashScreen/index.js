/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

import {Images, Constants} from '@common';
import {View, Text, Image, StyleSheet, Platform, UIManager} from 'react-native';

let prepared = false;

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        // this.prepareData = this.prepareData.bind(this);

        if (Platform.OS === 'android') {
            //noinspection JSUnresolvedFunction
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }

    componentDidMount() {
        // setTimeout(this.props.navigation.navigate("Login"), Constants.SplashScreen.Duration);
        // setTimeout('', 2000);
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
export default SplashScreen;
