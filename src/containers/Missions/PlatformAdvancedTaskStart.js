/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View, Image, Platform, UIManager, AsyncStorage, StyleSheet, PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants, Styles, Color} from '@common';
import RNPickerSelect from 'react-native-picker-select';
import { SelectMultipleButton } from 'react-native-selectmultiple-button'
import {Spinner1} from "@components";
import SnapSlider from 'react-native-snap-slider';
import {Button, Container, Content, Footer, Text, Toast} from 'native-base';
import {INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT} from "../../actions/types";

import {getMemberCanReceiveAccount, initializeStatus} from './../../actions';
import {Actions} from "react-native-router-flux";

const usedDevices = ["全部", "手机", "电脑"];
const refundLists = ["全部", "平台返款", "商家返款"];
class PlatformAdvancedTaskStart extends Component {
    priceOptions = [
        {value: 500, label: '500'},
        {value: 1000, label: '1000'},
        {value: 2000, label: '2000'},
        {value: 3000, label: '3000'},
        {value: 10000, label: '10000'}
    ];

    constructor(props) {
        super(props);
        this.slidingComplete = this.slidingComplete.bind(this);
        this.state={selectedAccount: null, radioSelectedDevice: '手机', radioSeletedRefundType:'平台返款', defaultItem: 1, maxPrice: 1000};

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token}  = this.props.user;
            this.props.getMemberCanReceiveAccount(UserId, Token, this.props.PlatId, 2); //2-BrowseTask
        }
    }

    slidingComplete(itemSelected) {
        console.log("item selected(from callback)" + itemSelected);
        this.setState({maxPrice: this.priceOptions[this.refs.slider.state.item].value});
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT)
    }

    componentDidMount() {
        Actions.platformAdvancedTaskStart({title: `${this.props.PlatName}接单任务`});
    }
    _singleTapRadioSelectedButtons(valueTap, device) {
        this.setState({
            radioSelectedDevice: device
        });
    }


    _singleTapRadioSelectedRefunds(valueTap, refundType) {

        this.setState({
            radioSeletedRefundType: refundType
        });
    }

    render() {
        let platAccounts = null;

        if (this.props.browseTaskObj && this.props.browseTaskObj.length > 0) {
            platAccounts = this.props.browseTaskObj.map(account => {
                return {label: account.PlatAccount, value: account.Id}
            });
        }

        return (
            <Container>
                <Content style={{backgroundColor:'#f8f8f8', marginTop: 15}}>
                    <View style={{marginBottom: 10, backgroundColor: 'white',...Styles.shadowStyle, paddingVertical: 10, paddingHorizontal: 15,  }}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>{this.props.PlatName}接单账号选择（必填） 拷贝</Text>
                        {platAccounts && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '最爱打法师',
                                    value: null,
                                }}
                                items={platAccounts}
                                onValueChange={value => this.setState({selectedAccount: value})}
                                style={{ ...pickerSelectStyles }}
                                mode='dropdown'
                                value={this.state.selectedAccount}
                            />
                        )}
                    </View>
                    <View style={{marginBottom: 10, paddingVertical: 10, ...Styles.shadowStyle,  ...Styles.cardStyleEmpty}}>
                        <View style={{...Styles.borderBottomStyle}}>
                            <Text style={{...Styles.normalTextStyle, marginRight: 10}}>选择操作设备</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingTop: 10}}>
                            {usedDevices.map(device => (
                                <SelectMultipleButton
                                    key={device}
                                    value={device}
                                    buttonViewStyle={{
                                        borderRadius: 20,
                                        height: 36,
                                        paddingHorizontal: 15
                                    }}
                                    highLightStyle={{
                                        borderColor: "gray",
                                        backgroundColor: "transparent",
                                        textColor: Color.textNormal,
                                        borderTintColor: Color.LightBlue,
                                        backgroundTintColor: Color.LightBlue,
                                        textTintColor: "white"
                                    }}
                                    selected={this.state.radioSelectedDevice === device}
                                    singleTap={valueTap =>
                                        this._singleTapRadioSelectedButtons(valueTap, device)
                                    }
                                />
                            ))}
                        </View>
                    </View>
                    <View style={{marginBottom: 10,paddingHorizontal: 15, ...Styles.cardStyleEmpty, paddingVertical: 10, ...Styles.shadowStyle, ...Styles.borderBottomStyle}}>
                        <Text style={{...Styles.normalTextStyle}}>选择垫付金额</Text>
                        <View style={{...Styles.ColumnCenterRight}}>
                            <View style={{...Styles.RowCenterRight}}>
                                <Text style={{...Styles.normalTextStyle, marginRight: 10}}>选择范</Text>
                                <Text style={{color: Color.textInfoOrange}}>500-{this.state.maxPrice}</Text>
                            </View>

                        </View>
                        <View style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 20}}>
                            <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                                        itemWrapperStyle={styles.snapsliderItemWrapper}
                                        itemStyle={styles.snapsliderItem}
                                        items={this.priceOptions}
                                        labelPosition="bottom"
                                        defaultItem={this.state.defaultItem}
                                        onSlidingComplete={this.slidingComplete} />
                        </View>
                    </View>
                    <View style={{marginBottom: 10, paddingVertical: 10, ...Styles.cardStyleEmpty, ...Styles.shadowStyle, ...Styles.borderBottomStyle}}>
                        <View style={{...Styles.borderBottomStyle}}>
                            <Text style={{...Styles.normalTextStyle, marginRight: 10}}>选择返款方式</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft, marginTop: 10}}>
                            {refundLists.map(refundType => (
                                <SelectMultipleButton
                                    key={refundType}
                                    value={refundType}
                                    buttonViewStyle={{
                                        borderRadius: 20,
                                        height: 36,
                                        paddingHorizontal: 15
                                    }}
                                    highLightStyle={{
                                        borderColor: "gray",
                                        backgroundColor: "transparent",
                                        textColor: Color.textNormal,
                                        borderTintColor: Color.LightBlue,
                                        backgroundTintColor: Color.LightBlue,
                                        textTintColor: "white"
                                    }}
                                    selected={this.state.radioSeletedRefundType === refundType}
                                    singleTap={valueTap =>
                                        this._singleTapRadioSelectedRefunds(valueTap, refundType)
                                    }
                                />
                            ))}
                        </View>
                    </View>

                </Content>

                {this.props.browseTaskObjLoading && (
                    <Spinner1 mode={'overlay'}/>
                )}
                <Footer >
                    <View style={{flex: 1, backgroundColor:'#f8f8f8', paddingHorizontal: 15,height: 60, paddingBottom: 15}}>
                        <Button block style={styles.buttonStyle}  >
                            <Text style={{fontSize: Styles.fontLarge, color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </Footer>
            </Container>
        );
    }
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: Styles.fontNormal,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1/PixelRatio.get(),
        borderColor: Color.Border,
        borderRadius: 4,
        backgroundColor: 'white',
        color: Color.textNormal,
    },
});

const styles ={
    contentStyle: {
        backgroundColor:'#f8f8f8',
        flex:1
    },
    itemStyle: {
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37
    },
    buttonStyle: {
        marginTop: 5, borderRadius: 5, backgroundColor: Color.LightBlue
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

    snapsliderContainer: {
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    snapslider: {
        borderWidth: 0,
    },
    snapsliderItemWrapper: {
        borderWidth: 0
    },
    snapsliderItem: {
        borderWidth: 0,
    }
} ;
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {platformLists, } = state.platformReducer;
    const {browseTaskObj, browseTaskObjMsg, browseTaskObjLoading} = state.taskReducer;
    return {user,platformLists, browseTaskObj, browseTaskObjMsg, browseTaskObjLoading};
};

export default connect(mapStateToProps, {getMemberCanReceiveAccount, initializeStatus})(PlatformAdvancedTaskStart);
