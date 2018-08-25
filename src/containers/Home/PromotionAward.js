import React, {Component} from 'react';

import {Platform, UIManager,Image, View, Linking, Text} from 'react-native'

import { Container, Content, Button, Tabs, Tab} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'
import Tab1 from './Tabs/Tab1';
import Tab2 from './Tabs/Tab2';

class PromotionAward extends Component {

    componentWillMount(){
    }


    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: Color.mainBackground, paddingTop: 15, marginBottom: 10}}>
                    <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>
                        <Tab heading="已发单0人"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <View style={Styles.mb10}/>
                            <Tab1 />
                        </Tab>
                        <Tab  heading="已注册0人" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <Tab2/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        );
    }
}

const styles = {
    cardStyle_1:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        paddingBottom: 10,
        borderColor:
        Color.borderNormal,
        borderBottomWidth:1
    },
    tabStyle: {
        backgroundColor: 'white',

    },
    activeTabStyle: {
        backgroundColor: 'white',
    },
    textStyle: {
        color: Color.textDark
    },
    activeTextStyle: {
        color: Color.LightBlue
    },
    tabBarUnderlineStyle:{
        backgroundColor: Color.LightBlue
    },
    textBlockDownStyle: {fontSize: Styles.fontLarge, color: Color.textInfoOrange, borderTopWidth:1, borderColor: Color.borderNormal},
};

const {cardStyle_1,textBlockDownStyle} = styles;

export default PromotionAward;
