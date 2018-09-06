import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'

import { Container, Content, Button, Footer, FooterTab} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";


class MyOrders extends Component {
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

    _renderContent(title, orderType) {
        //orderType: 1-Advanced, 2-Browse
        return (
            <View style={{marginTop: 10}}>
                <View style={{backgroundColor: 'white', ...Styles.shadowStyle}}>
                    <Text style={{backgroundColor: 'white', marginLeft: 15, paddingVertical: 10, paddingRight: 15, borderBottomWidth:1, borderColor: Color.LightBorder}}>{title}</Text>
                    <View style={{flex: 1, flexDirection:'row', ...Styles.RowCenterBetween,
                        padding: 10, flexWrap: 'wrap'}}>
                        <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> orderType===1? Actions.advancedorders(): Actions.browseorders()}>
                            <Image source={Images.preorders_01}  style={{width: 50, height:50}}/>
                            <Text style={{marginTop: 10, color: Color.textNormal}}>未完成</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> orderType===1? Actions.advancedorders(): Actions.browseorders()}>
                            <Image source={Images.preorders_02}  style={{width: 50, height:50}}/>
                            <Text style={{marginTop: 10, color: Color.textNormal}}>已完成</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> orderType===1? Actions.advancedorders(): Actions.browseorders()}>
                            <Image source={Images.preorders_03}  style={{width: 50, height:50}}/>
                            <Text style={{marginTop: 10, color: Color.textNormal}}>已撤销</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.6} style={{flex:1, flexDirection: 'column', alignItems: 'center'}} onPress={()=> orderType===1? Actions.advancedorders(): Actions.browseorders()}>
                            <Image source={Images.preorders_04}  style={{width: 50, height:50}}/>
                            <Text style={{marginTop: 10, color: Color.textNormal}}>申诉中</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content>
                    {this._renderContent('垫付任务', 1)}
                    {this._renderContent('浏览任务', 2)}
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
                        <View style={{alignItems: 'center', flex: 1}} >
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.usercentermain()}>
                                <Image source={Images.profileIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.textNormal}}>个人中心</Text>
                            </TouchableOpacity>
                        </View>
                    </FooterTab>

                </Footer>
            </Container>
        );
    }
}

export default MyOrders;