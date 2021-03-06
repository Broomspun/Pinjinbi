/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image, PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Actions} from "react-native-router-flux";
import { Button, Container, Content, Text, Footer } from 'native-base';
import {getMemberPlatformInfo} from "@actions";

class TabaoMain extends Component {

    constructor(props){
        super(props);

        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            this.props.getMemberPlatformInfo(UserId, Token, this.props.PlatId);
        }
        console.log('qqq',props);
    }

    componentWillReceiveProps(nextProps){
    }

    componentDidMount() {
        Actions.TabaoMain({title: `绑定${this.props.PlatName}账号`});
    }

    componentWillUpdate(){
    }

    _renderTabaoContent = () => {
        if(this.props.user && this.props.platObj && this.props.platObj.AccountList.length>0) {
            let images = [Images.p01, Images.p02, Images.p03, Images.p04, Images.p05, Images.p06, Images.p07, Images.p08];
            const {AccountList} = this.props.platObj;
            let platforms = AccountList.map((account, index) => {
                return (
                    <View key={index} style={{borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border, paddingVertical: 10}}>
                        <View  style={{...Styles.RowCenterBetween, ...Styles.shadowStyle, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                            <View style={{...Styles.RowCenterLeft}}>
                                <Image source={images[this.props.PlatId-1]} style={{width: 20, height: 20, marginRight: 10}} />
                                <Text>最爱大法师</Text>
                            </View>
                            <View>
                                <Text style={{color: Color.orangeColor, fontSize: Styles.fontLarge}}>{account.ReviewStatusText}</Text>
                            </View>
                        </View>
                        <View  style={{...Styles.RowCenterLeft, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>收货地址</Text>
                            <Text style={{marginLeft: 10, color: 'black', fontSize: Styles.fontNormal}}>{account.AddressInfo}</Text>
                        </View>
                        <View  style={{...Styles.RowCenterLeft, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>联系电话</Text>
                            <Text style={{marginLeft: 10, color: 'black', fontSize: Styles.fontNormal}}>{account.ConsigneeCall}</Text>
                        </View>
                        <View  style={{...Styles.RowCenterLeft, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>联系人</Text>
                            <Text style={{marginLeft: 10, color: 'black', fontSize: Styles.fontNormal}}>{account.ConsigneeName}</Text>
                        </View>
                        <View style={{marginTop: 25, backgroundColor: Color.LightBlue1, paddingHorizontal: 15, paddingVertical: 10}}>
                            <Text style={{color: 'white'}}>可接单数：今日5单/本周 25单/ 本月80单</Text>
                        </View>
                    </View>
                )
            });

            return (
                <View>
                {platforms}
                </View>
            )
        }
        else {
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height-150}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.commision_empty_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时没有相关数据</Text>
                    </View>
                </View>
            )
        }
    };

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content style={{...Styles.mt15}}>
                    {this._renderTabaoContent()}
                </Content>
                {/*{((this.props.user && this.props.platObj && this.props.platObj.AccountList.length===0) || !this.props.platObj )&& (*/}
                <Footer>
                    <View style={{flex:1}}>
                        <View style={{...Styles.ColumnCenter, flex: 1}}>
                            <Button full style={{backgroundColor: 'white', height: 60}} onPress = {()=>Actions.bindTabaoAccount({PlatId: this.props.PlatId, PlatName: this.props.PlatName})}>
                                <Text style={{color: Color.LightBlue1, fontSize: Styles.fontLarge}}>+ 新增一个{this.props.PlatName}账户</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
                {/*)}*/}
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {platObj} = state.platformReducer;
    return {user,platObj};
};
export default connect(mapStateToProps, {getMemberPlatformInfo})(TabaoMain);

