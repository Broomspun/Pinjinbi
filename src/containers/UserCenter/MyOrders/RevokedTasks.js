import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";

class RevokedTasks extends Component {
    state = {selectedTab: 1};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentDidUpdate() {
        console.log('tab event',this.state);
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content>
                    <View style={{...Styles.basicStyle, ...Styles.shadowStyle, flexDirection: 'row', flex:1, justifyContent:'space-around', alignItems: 'center'}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-around'}}>
                            <Image source={Images.product} style={{ height: 80, width: 80, marginRight:10}}/>
                            <View style={{flex:1, justifyContent:'space-around'}}>
                                <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                    <Image source={Images.orange_head} style={{width: 15, height: 15, marginRight: 10}} />
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>最爱打法师</Text>
                                </View>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>任务ID：286693</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>撤销时间：2018-07-28 16:20</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>撤销原因：达不到商家备注要求</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...Styles.basicStyle, ...Styles.shadowStyle, flexDirection: 'row', flex:1, justifyContent:'space-around', alignItems: 'center'}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-around'}}>
                            <Image source={Images.product} style={{ height: 80, width: 80, marginRight:10}}/>
                            <View style={{flex:1, justifyContent:'space-around'}}>
                                <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                    <Image source={Images.orange_head} style={{width: 15, height: 15, marginRight: 10}} />
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>最爱打法师</Text>
                                </View>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>任务ID：286693</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>撤销时间：2018-07-28 16:20</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>撤销原因：达不到商家备注要求</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...Styles.basicStyle, ...Styles.shadowStyle, flexDirection: 'row', flex:1, justifyContent:'space-around', alignItems: 'center'}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-around'}}>
                            <Image source={Images.product} style={{ height: 80, width: 80, marginRight:10}}/>
                            <View style={{flex:1, justifyContent:'space-around'}}>
                                <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                    <Image source={Images.orange_head} style={{width: 15, height: 15, marginRight: 10}} />
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>最爱打法师</Text>
                                </View>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>任务ID：286693</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>撤销时间：2018-07-28 16:20</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>撤销原因：达不到商家备注要求</Text>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
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
    }
};

export default RevokedTasks;
