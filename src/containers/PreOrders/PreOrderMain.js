import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'

import { Container, Content, Button, Footer, FooterTab} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";


class PreOrderMain extends Component {
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

    _renderContent(title) {
        return (
            <View style={{marginTop: 10}}>
                <View style={{backgroundColor: 'white', ...Styles.shadowStyle}}>
                    <Text style={{backgroundColor: 'white', marginLeft: 15, paddingVertical: 10, paddingRight: 15, borderBottomWidth:1, borderColor: Color.LightBorder}}>{title}</Text>
                    <View style={{flex: 1, flexDirection:'row', ...Styles.RowCenterBetween,
                         padding: 10, flexWrap: 'wrap'}}>
                    <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> Actions.browsetask()}>
                        <Image source={Images.preorders_01}  style={{width: 50, height:50}}/>
                        <Text style={{marginTop: 10, color: Color.textNormal}}>未完成</Text>
                    </TouchableOpacity>
                    <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={Images.preorders_02}  style={{width: 50, height:50}}/>
                        <Text style={{marginTop: 10, color: Color.textNormal}}>已完成</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                        <Image source={Images.preorders_03}  style={{width: 50, height:50}}/>
                        <Text style={{marginTop: 10, color: Color.textNormal}}>已撤销</Text>
                    </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginTop: 10}}>
                    {this._renderContent('垫付任务')}
                    {this._renderContent('浏览任务')}
                    <View><Text> </Text></View>
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
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.totalmissions()}>
                                <Image source={Images.taskIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.textNormal}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>

                        <View  style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}}>
                                <Image source={Images.preorderIconActive} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.LightBlue1}}>已接任务 </Text>
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

export default PreOrderMain;
