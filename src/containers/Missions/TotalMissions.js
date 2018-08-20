import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'

import { Container, Content, Button, Footer, FooterTab} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";


class TotalMissions extends Component {
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

    _renderTabs = ()=>{
        const {selectedTab} = this.state;
        if(selectedTab==1) {
            return (
                <View style={{flex: 1, ...Styles.RowCenterBetween, paddingHorizontal:15}}>
                    <Button
                        onPress = {()=>this.setState({selectedTab: 1})}
                        style={{flex:1, backgroundColor: Color.DarkerLightBlue, borderColor: Color.DarkerLightBlue, borderWidth: 1,borderBottomLeftRadius: 30, borderTopLeftRadius: 30,borderBottomRightRadius: 0, borderTopRightRadius: 0}} block info>
                        <Text style={{color: 'white', fontSize: Styles.fontNormal}}>垫付任务</Text>
                    </Button>
                    <Button transparent
                            onPress = {()=>this.setState({selectedTab: 2})}
                            style={{flex:1, borderBottomRightRadius: 30, borderTopRightRadius: 30, borderWidth: 1, borderColor: Color.Border}} block>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>浏览任务</Text>
                    </Button>
                </View>
            )

        }
        else {
            return (
                <View style={{flex: 1, ...Styles.RowCenterBetween, paddingHorizontal:15}}>
                    <Button
                        onPress = {()=>this.setState({selectedTab: 1})}
                        style={{flex:1, backgroundColor: 'white',borderColor: Color.Border, borderBottomLeftRadius: 30,borderWidth: 1, borderTopLeftRadius: 30}} block info>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>垫付任务</Text>
                    </Button>
                    <Button
                        onPress = {()=>this.setState({selectedTab: 2})}
                        style={{flex:1, backgroundColor: Color.DarkerLightBlue, borderBottomRightRadius: 30, borderTopRightRadius: 30, borderWidth: 1, borderColor: Color.DarkerLightBlue}} block>
                        <Text style={{color: 'white', fontSize: Styles.fontNormal}}>浏览任务</Text>
                    </Button>
                </View>
            )

        }

    };

    _renderContent() {
        const {selectedTab} = this.state;
        if(selectedTab==1) {
            return (
                <View>
                    <View style={{flex: 1, flexDirection:'row', ...Styles.RowCenterBetween, marginTop: 10,
                        backgroundColor: 'white', padding: 10, flexWrap: 'wrap'}}>
                        <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> Actions.browsetask()}>
                            <Image source={Images.mission_01}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>淘宝任务</Text>
                        </TouchableOpacity>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_02}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>拼多多</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_03}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>京东任务</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_04}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>活动任务</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_05}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>预售任务</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-start', alignItems: 'flex-start',
                        backgroundColor: 'white', padding: 10, flexWrap: 'wrap'}}>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_06}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>美丽说</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_07}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>蘑菇街</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}></View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}></View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}></View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={{flex: 1, flexDirection:'row', ...Styles.RowCenterBetween, marginTop: 10,
                        backgroundColor: 'white', padding: 10, flexWrap: 'wrap'}}>
                        <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> Actions.browsetask()}>
                            <Image source={Images.mission_01}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>淘宝任务</Text>
                        </TouchableOpacity>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_02}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>拼多多</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_03}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>京东任务</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_06}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>美丽说</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_07}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>蘑菇街</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginTop: 10}}>
                    {this._renderTabs()}
                    {this._renderContent()}
                </Content>
                <Footer>
                    <FooterTab  style={{flex: 1, flexDirection: 'row',backgroundColor: '#deedff', justifyContent: 'space-around', paddingLeft: 15, paddingRight: 15, alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.home()}>
                                <Image source={Images.homeIcon} style={{width: 26, height: 26}} />
                                <Text style={{fontSize:14, color:Color.textNormal}}>首页</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}}>
                                <Image source={Images.taskIconActive} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.LightBlue1}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>

                        <View  style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.preordermain()}>
                            <Image source={Images.preorderIcon} style={{width: 26, height: 26}}/>
                            <Text style={{fontSize:14, color:Color.textNormal}}>已接任务 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Image source={Images.profileIcon} style={{width: 26, height: 26}}/>
                            <Text style={{fontSize:14, color:Color.textNormal}}>个人中心</Text>
                        </View>
                    </FooterTab>

                </Footer>
            </Container>
        );
    }
}

export default TotalMissions;
