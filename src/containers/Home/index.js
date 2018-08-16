import React, {Component} from 'react';
import axios from 'axios';
import {Image, View, TouchableOpacity} from 'react-native'
import {Platform, UIManager, ScrollView} from "react-native";

import { Container, Content, Footer, FooterTab, Button, Text,Icon } from 'native-base';
import {Images, Constants} from '@common';


class Home extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {user: props.user};
        const {UserId, Token} = this.state.user;

        axios.get(`http://pjbapi.wtvxin.com/api/Login/GetMemberInfo?UserId=${UserId}&Token=${Token}`)
            .then((res) => {
                if(res.data.errcode===0) {
                    this.setState({user: {...res.data.obj, ...this.state.user}});
                    console.log(this.state);
                }
            })
            .catch(()=>{
            })
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{backgroundColor: '#f6f6f6', paddingBottom: 10}}>
                    <Image source={Images.homeBackTop} style={{height: 180, width: null, flex: 1}}/>
                    <View style={{...styles.moneyStyle,backgroundColor: '#fe9142',height: 60,...styles.shadowStyle}}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Image source={Images.silcCardIcon} style={{width: 36, height: 30}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{marginLeft: 20, color: 'white', fontSize: 16}}>
                                    佣金收益(金)
                                </Text>
                                <Text style={{marginLeft: 20, color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                                    {this.state.user.Amount}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', paddingLeft: 20}}>
                            <Image source={Images.jianzhiqianbao} style={{width: 33, height: 36}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{marginLeft: 20, color: 'white', fontSize: 16}}>
                                    本金总计(元)
                                </Text>
                                <Text style={{marginLeft: 20, color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                                    {this.state.user.Wallet}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...styles.secondViewStyle, height: 100, ...styles.shadowStyle}}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#44c362'}}>
                                <Icon type="FontAwesome" name="check" style={{color: 'white'}}/>
                            </View>
                            <Text style={{color: '#606060'}}>补单任务</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#7a88f1'}}>
                                <Icon type="FontAwesome" name="eye" style={{color: 'white'}}/>
                            </View >
                            <Text style={{color: '#606060'}}>浏览任务</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#ff713a'}}>
                                <Image source={Images.amoyIcon} style={{width: 25, height: 25}} />
                            </View>
                            <Text style={{color: '#606060'}}>淘宝</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#f42d2d'}}>
                                <Image source={Images.flightLotIcon} style={{width: 25, height: 25}}/>
                            </View>
                            <Text style={{color: '#606060'}}>拼多多</Text>
                        </View>
                    </View>
                    <View style={{...styles.moneyStyle, backgroundColor: '#fff', height: 60, ...styles.shadowStyle}}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Text style={{color: '#606060'}}>微信：pin8002</Text>
                            <Button bordered style={{height: 28, borderRadius: 14, borderColor: '#606060', marginLeft: 15}}>
                                <Text style={{color: '#606060', fontSize: 18}}>复制</Text>
                            </Button>
                        </View>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Text style={{marginLeft: 20, color: '#606060'}}>工作时间  09:00-22:00</Text>
                        </View>
                    </View>
                    <View style={{...styles.thirdRowStyle, ...styles.shadowStyle}}>
                        <View style={{...styles.cardStyle,backgroundColor: '#03cea5' }}>
                            <View style={{...styles.iconWrapper1, }}>
                                <Image source={Images.usersIcon} style={{width: 35, height: 35}} />
                            </View>
                            <Text style={{color: '#fff'}}>新手任务</Text>
                        </View>
                        <View style={{...styles.cardStyle, backgroundColor: '#59a3ff'}}>
                            <View style={{...styles.iconWrapper1}}>
                                <Image source={Images.promotionIcon} style={{width: 29, height: 35}} />
                            </View >
                            <Text style={{color: '#fff'}}>推广奖励</Text>
                        </View>
                        <View style={{...styles.cardStyle,backgroundColor: '#fbce33' }}>
                            <View style={{...styles.iconWrapper1 }}>
                                <Image source={Images.questionIcon} style={{width: 40, height: 35}} />
                            </View>
                            <Text style={{color: '#fff'}}>常见问题</Text>
                        </View>
                    </View>
                    <View style={{...styles.fourthRowStyle, ...styles.shadowStyle}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: '#efefef'}} >
                            <Text style={{color:'#606060'}}>每日任务</Text>
                        </View>
                        <View style={{flex: 1, width: null, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={Images.wodedingdanIcon} style={{width: 35, height: 35}}/>
                                <Text style={{marginLeft: 5, fontSize: 14, color: '#606060'}}>签到领积分</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={Images.prizeIcon} style={{width: 35, height: 35}} />
                                <Text style={{marginLeft: 5, fontSize: 14, color: '#606060'}}>积分抽奖</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={Images.userfavoriteIcon} style={{width: 35, height: 35}}/>
                                <Text style={{marginLeft: 5, fontSize: 14, color: '#606060'}}>邀请好友</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 10, marginBottom: 10}}>
                        <Image source={Images.footerBackImage} style={{height: 120, width: null, flex: 1, alignItems: 'center'}} />
                    </View>
                </ScrollView>
                <View style={{height: 60}}>
                    <FooterTab  style={{flex: 1, flexDirection: 'row',backgroundColor: '#deedff', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Image source={Images.homeIconActive} style={{width: 26, height: 26}} />
                            <Text style={{fontSize:14, color:'#606060'}}>首页</Text>
                        </View>
                        <View style={{alignItems: 'center' , flex: 1}}>
                            <Image source={Images.taskIcon} style={{width: 26, height: 26}}/>
                            <Text style={{fontSize:14, color:'#606060'}}>全部任务</Text>
                        </View>
                        <View style={{alignItems: 'center' , flex: 1}}>


                        </View>

                        <View  style={{alignItems: 'center' , flex: 1}}>
                            <Image source={Images.preorderIcon} style={{width: 26, height: 26}}/>
                            <Text style={{fontSize:14, color:'#606060'}}>已接任务 </Text>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Image source={Images.profileIcon} style={{width: 26, height: 26}}/>
                            <Text style={{fontSize:14, color:'#606060'}}>个人中心</Text>
                        </View>
                    </FooterTab>
                </View>
                <View style={{alignItems: 'center', position: 'absolute', bottom: 25, zIndex: 99999, left: 0, right: 0}} >
                    <View style={styles.footerCenterStyle}>
                        <View style={{backgroundColor: '#ff7a19', width: 50, height: 50, borderRadius: 25, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontSize:14,color: 'white'}}>接单</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    moneyStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 0,
        shadowColor: '#fb710e',
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    iconWrapper: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    iconWrapper1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },

    secondViewStyle:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonStyle: {
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 16,
        marginLeft: 10,
        height: 28,
        paddingLeft: 20,
        paddingRight:20,
        alignItems: 'center'
    },
    thirdRowStyle: {
        flex: 1,
        marginTop: 10,
        width: null,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    fourthRowStyle: {marginTop: 10,
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    cardStyle:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        paddingTop: 20,
        paddingBottom: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
    },
    footerCenterStyle:{
        backgroundColor: '#fff',
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
};

export default Home;
