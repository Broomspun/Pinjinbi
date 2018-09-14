import React, {Component} from 'react';
import Modal from 'react-native-modal'
import {connect} from 'react-redux';
import Carousel from 'react-native-banner-carousel';

import {Image, View, TouchableOpacity, PixelRatio} from 'react-native'
import {Platform, UIManager, Dimensions} from "react-native";

import { FooterTab, Button, Text,Icon, Container, Content } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux";

import {getBindingInfo,requestInfo} from './../../Services'
import {homeLoading, getHomeBanners} from "../../actions";

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

class Home extends Component {
    state= {bShowStartOrderModal: false, orderStartBtn: false, orderCancelBtn: true};
    constructor(props) {

        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }




        if(props.user) {
            this.state = {user: props.user};

            const {UserId, Token} = this.state.user;

            (async () => {
                await this.props.getHomeBanners();
            })();

            (async () => {
                await this.props.homeLoading(UserId, Token, this.state.user);
            })();


            (async () => {
                let bindInfo = await getBindingInfo(UserId, Token);
                if (bindInfo.status === 200) {
                    this.setState({bindInfo: bindInfo.data});
                }
            })();

            (async () => {
                let qqInfo = await requestInfo('Member/GetUserQQInfo', UserId, Token);
                if (qqInfo.status === 200) {
                    this.setState({qq: qqInfo.data});
                }
            })();
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.user)
            Actions.auth();
    }

    componentDidUpdate() {
    }

    onStartBindingPress() {
        this.setState({bShowStartOrderModal: false});
        Actions.verifymain();
    }

    _renderShowOrderStartModal = () => (
        <View style={{borderRadius: 10, width: 300, height: 200, backgroundColor: 'white', paddingVertical: 30 }}>
            <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder, paddingBottom: 30}}>
                    <Text style={{color:'#e84e40', fontSize: Styles.fontLarge, fontWeight: '700'}}>请先完成新手任务</Text>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <Button onPress={()=>this.setState({bShowStartOrderModal: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontLarge,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}} onPress={this.onStartBindingPress.bind(this)}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>
        </View>
    );

    getUserBindStatus =  () => {

        if(this.state.bindInfo.IsAUT===0){
            this.setState({bShowStartOrderModal: true});
        }
    };

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }

    render() {
        return(
            <Container style={{flex: 1}}>
                <Content style={{backgroundColor: '#f6f6f6', paddingBottom: 10}}>
                    <Modal  isVisible={this.state.bShowStartOrderModal} style={{...Styles.ColumnCenter}}>
                        {this._renderShowOrderStartModal()}
                    </Modal>
                    {this.props.homeBanners && (
                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}
                        >
                            {this.props.homeBanners.map((image, index) => this.renderPage(image, index))}
                        </Carousel>
                    )}
                    <View style={{...styles.moneyStyle,backgroundColor: '#fe9142',height: 60,...Styles.shadowStyle}}>
                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                            <Image source={Images.silcCardIcon} style={{width: 36, height: 30}}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{marginLeft: 20, color: 'white', fontSize: 16}}>
                                    佣金收益(金)
                                </Text>
                                <Text style={{marginLeft: 20, color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                                    {this.props.user?this.props.user.Amount:0.0}
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
                                    {this.props.user?this.props.user.Wallet:0.0}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...styles.secondViewStyle, height: 100, ...Styles.shadowStyle}}>
                        <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'column', alignItems: 'center'}} onPress={this.getUserBindStatus.bind(this)}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#44c362'}}>
                                <Icon type="FontAwesome" name="check" style={{color: 'white'}}/>
                            </View>
                            <Text style={{color: Color.textNormal}}>补单任务</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.9} style={{flexDirection: 'column', alignItems: 'center'}} onPress={this.getUserBindStatus.bind(this)}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#7a88f1'}}>
                                <Icon type="FontAwesome" name="eye" style={{color: 'white'}}/>
                            </View >
                            <Text style={{color: Color.textNormal}}>浏览任务</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#ff713a'}}>
                                <Image source={Images.amoyIcon} style={{width: 25, height: 25}} />
                            </View>
                            <Text style={{color: Color.textNormal}}>淘宝</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <View style={{...styles.iconWrapper, backgroundColor: '#f42d2d'}}>
                                <Image source={Images.flightLotIcon} style={{width: 25, height: 25}}/>
                            </View>
                            <Text style={{color: Color.textNormal}}>拼多多</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#fff', marginTop: 10, ...Styles.shadowStyle}}>
                        <Button style={{marginLeft: 15, marginTop: 10}} info rounded small onPress={()=>Actions.newslist()}><Text>公告</Text></Button>
                        <View style={{...styles.moneyStyle, paddingBottom: 10,flexDirection: 'row', flex:1}}>
                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                <Text style={{color: Color.textNormal}}>微信：pin8002</Text>
                                <TouchableOpacity style={{height: 28, borderRadius: 14,borderWidth:1/PixelRatio.get(),paddingHorizontal:5, borderColor: Color.textNormal, marginLeft: 5, justifyContent:'center'}}>
                                    <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall, }}>复制</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{...Styles.RowCenterRight, flex: 1}}>
                                <Text style={{color: Color.textNormal,alignSelf: 'flex-end'}}>工作时间  09:00-22:00</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...styles.thirdRowStyle, ...Styles.shadowStyle}}>
                        <View style={{...styles.cardStyle,backgroundColor: '#03cea5' }}>
                            <View style={{...styles.iconWrapper1, }}>
                                <Image source={Images.usersIcon} style={{width: 35, height: 35}} />
                            </View>
                            <Text style={{color: '#fff'}}>新手任务</Text>
                        </View>
                        <TouchableOpacity activeOpacity={.8} style={{...styles.cardStyle, backgroundColor: '#59a3ff'}} onPress={()=>Actions.promotion()}>
                            <View style={{...styles.iconWrapper1}}>
                                <Image source={Images.promotionIcon} style={{width: 29, height: 35}} />
                            </View >
                            <Text style={{color: '#fff'}}>推广奖励</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.8} style={{...styles.cardStyle,backgroundColor: '#fbce33' }} onPress={()=>Actions.faqmain()}>
                            <View style={{...styles.iconWrapper1 }}>
                                <Image source={Images.questionIcon} style={{width: 40, height: 35}} />
                            </View>
                            <Text style={{color: '#fff'}}>常见问题</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{...styles.fourthRowStyle, ...Styles.shadowStyle}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: '#efefef'}} >
                            <Text style={{color:Color.textNormal}}>每日任务</Text>
                        </View>
                        <View style={{flex: 1, width: null, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center'}}>
                                <TouchableOpacity  activeOpacity={.8} transparent style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}} onPress={()=>Actions.prize()}>
                                    <Image source={Images.wodedingdanIcon} style={{width: 35, height: 35, marginRight: 0}}/>
                                    <Text style={{marginLeft: 0, fontSize: 14, color: Color.textNormal}}>签到领积分</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>Actions.loto()}>
                                    <Image source={Images.prizeIcon} style={{width: 35, height: 35}} />
                                    <Text style={{marginLeft: 5, fontSize: 14, color: Color.textNormal}}>积分抽奖</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end', alignItems: 'center'}}>
                                <TouchableOpacity activeOpacity={.8} style={{flexDirection: 'row', alignItems: 'center'}} >
                                    <Image source={Images.userfavoriteIcon} style={{width: 35, height: 35}}/>
                                    <Text style={{marginLeft: 5, fontSize: 14, color: Color.textNormal}}>邀请好友</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={{marginTop: 10, marginBottom: 10}}>
                        <Image source={Images.footerBackImage} style={{height: 120, width: null, flex: 1, alignItems: 'center'}} />
                    </View>
                </Content>
                <View style={{height: 60}}>
                    <FooterTab  style={{flex: 1, flexDirection: 'row',backgroundColor: '#deedff', justifyContent: 'space-around', paddingLeft: 15, paddingRight: 15, alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Image source={Images.homeIconActive} style={{width: 26, height: 26}} />
                            <Text style={{fontSize:14, color:Color.LightBlue1}}>首页</Text>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.totalmissions()}>
                                <Image source={Images.taskIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.textNormal}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center' , flex: 1}}>
                        </View>
                        <View  style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.myorders()}>
                                <Image source={Images.preorderIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.textNormal}}>已接任务 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.usercentermain({user: this.props.user})}>
                                <Image source={Images.profileIcon} style={{width: 26, height: 26}} />
                                <Text style={{fontSize:14, color:Color.textNormal}}>个人中心</Text>
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </View>
                <View style={{alignSelf: 'center', position: 'absolute', width: 60,bottom: 25, zIndex: 99999}} >
                    <View style={styles.footerCenterStyle}>
                        <TouchableOpacity  activeOpacity={.8} onPress={()=>this.setState({bShowStartOrderModal: true})}
                                           style={{backgroundColor: '#ff7a19', width: 50, height: 50, borderRadius: 25, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontSize:14,color: 'white'}}>接单</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
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
        borderColor: Color.textNormal,
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

const mapStateToProps = (state) => {
    const {user, homeBanners} = state.loginForm;
    return {user,homeBanners}
};
export default connect(mapStateToProps, {homeLoading, getHomeBanners})(Home);
