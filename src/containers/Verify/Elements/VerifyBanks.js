/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View, Image, TouchableOpacity, PixelRatio, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Button, Card, Container, Content, Form, Icon, Input, Item, Text, Toast} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

import {submitBankInfo, getAreaLists, initializeStatus} from "../../../actions";
import {INITIALIZE_BANK_INFO_STATUS} from "../../../actions/types";
import {Actions} from "react-native-router-flux";


class VerifyBanks extends Component {

    state={
        bankSelectedStatus: false,
        icon: 'chevron-small-right',
        selectedValue:'请选择银行',
        bankName: '',
        cardName: '蓝色',
        cardNo: '6217001210024455220',
        city: '上海',
        branch: '市建设银行分行'
    };

    constructor(props){
        super(props);
        this.setProvinceCode = this.setProvinceCode.bind(this);
        this.state = {
            user: this.props.user,
            bankSelectedStatus: false,
            icon: 'chevron-small-right',
            selectedValue:'请选择银行',
            bankName: '',
            cardName: '蓝色',
            cardNo: '6217001210024455220',
            city: '上海',
            branch: '市建设银行分行',
            ProvinceCode: undefined,
            ProvinceName: '',
            CityCode: undefined,
            CityName: '',
            DistrictCode: undefined,
            DistrictName: '',
        };
    }

    componentDidMount(){
        if(this.props.provinces===null)
            this.props.getAreaLists('Province');
    }
    componentDidUpdate(nextProps){
    }

    componentWillUpdate(){
    }
    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_BANK_INFO_STATUS);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.user && nextProps.bBankSubmitSuccess!==null) {
            if(nextProps.bBankSubmitSuccess) {
                Alert.alert(
                    '成功',
                    nextProps.bankMsg,
                    [
                        {text: 'OK', onPress: () => Actions.verifymain()},
                    ],
                    {cancelable: false}
                )
            }
            else {
                Alert.alert(
                    '失败',
                    nextProps.bankMsg,
                    [
                        {text: 'OK', onPress: () =>{nextProps.bankErrorCode=== 2 ? Actions.verifymain(): this.initializeStatus(INITIALIZE_BANK_INFO_STATUS)}},
                    ],
                    {cancelable: false}
                )
            }
        }
    }
    initializeStatus = ()=> {
        this.props.initializeStatus(INITIALIZE_BANK_INFO_STATUS);
    };

    banks = [
        {name:'中国工商银行',id:1,  image:Images.bank_01},
        {name:'中国农业银行',id:2,  image:Images.bank_02},
        {name:'浦发银行'   ,id:3,  image:Images.bank_03},
        {name:'中国建设银行',id:4,  image:Images.bank_04},
        {name:'中国银行'   ,id:5,  image:Images.bank_05},
        {name:'交通银行'   ,id:6,  image:Images.bank_06},
        {name:'招商银行'   ,id:7,  image:Images.bank_07},
        {name:'平安银行'   ,id:8,  image:Images.bank_08},
        {name:'中信银行'   ,id:9,  image:Images.bank_09},
        {name:'兴业银行'   ,id:10, image:Images.bank_10},
        {name:'民生银行'   ,id:11, image:Images.bank_11},
        {name:'光大银行'   ,id:12, image:Images.bank_12},
        {name:'广发银行'   ,id:13, image:Images.bank_13},
        {name:'华夏银行'   ,id:14, image:Images.bank_14},
    ];
    _renderBankLists = ()=> {

        if(this.state.bankSelectedStatus) {
            return this.banks.map(bank =>
                <TouchableOpacity key={bank.id} onPress={()=>this.setState({selectedValue: bank.name,bankName: bank.name, bankSelectedStatus: false, icon:this.state.bankSelectedStatus?'chevron-small-right':'chevron-small-down' })}
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1 / PixelRatio.get(),
                    paddingVertical: 5,
                    borderColor: Color.Border,
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    marginHorizontal: 15
                }}>
                    <Image source={bank.image} style={{height: 20, width: 20, marginLeft:5, marginRight: 5}}/>
                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>{bank.name}</Text>
                </TouchableOpacity>
            )
        }
        return null;
    };

    onSelectButton = (index)=>{
        this.setState({bankSelectedStatus: !this.state.bankSelectedStatus,
            icon:this.state.bankSelectedStatus?'chevron-small-right':'chevron-small-down',
        });
    };

    onSubmit() {
        const {UserId, Token} = this.props.user;
        const {bankName,cardName,cardNo} = this.state;

        const {ProvinceName, CityName, DistrictName} = this.state;
        let address = `${ProvinceName}${CityName}${DistrictName}`;

        if(bankName ==='') {
            Toast.show({
                text: 'Please enter bank name!', buttonText: "是", type: "danger",
                duration: 3000
            });
            return;
        }

        if(cardName ==='') {
            Toast.show({
                text: 'Please enter Card Holder!', buttonText: "是", type: "danger",
                duration: 3000
            });
            return;
        }

        if(cardNo ==='') {
            Toast.show({
                text: 'Please enter Card Number!', buttonText: "是", type: "danger",
                duration: 3000
            });
            return;
        }

        if(ProvinceName ==='') {
            Toast.show({
                text: 'Please choose Province!', buttonText: "是", type: "danger",
                duration: 3000
            });
            return;
        }

        if(CityName ==='') {
            Toast.show({
                text: 'Please choose City!', buttonText: "是", type: "danger",
                duration: 3000
            });
            return;
        }

        //Validation

        // let address = city+branch;
        this.props.submitBankInfo(UserId, Token, bankName, cardNo, address, cardName);
    }

    setProvinceCode = (value, index)=>{
        this.setState({
            ProvinceCode: value,
            ProvinceName: this.props.provinces[index]['label'],
        });

        this.props.getAreaLists('City', value);
        console.log(this.state);

    };

    setCityCode = (value, index) => {
        this.setState({
            CityCode: value,
            CityName: this.props.cities[index]['label'],
        });

        this.props.getAreaLists('District', value);
    };

    setDistrictCode(value, index) {
        this.setState({
            DistrictCode: value,
            DistrictName: this.props.districts[index]['label'],
        });
    }

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content>
                    <View style={{flex:1, flexDirection: 'row', backgroundColor:'transparent',
                        justifyContent: 'flex-start', marginTop: 10, marginHorizontal:15}}>
                        <Image source={Images.alarm_notice} style={{width: 20, height: 20, marginRight: 5}}/>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>姓名必须和身份证中的一样，务必保证银行卡信息正确，否则 无法退款</Text>
                    </View>
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入持卡人姓名" //Card Name
                                value = {this.state.cardName}
                                style={{fontSize: Styles.fontSmall}}
                                onChangeText = {(value)=>this.setState({cardName: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入卡号" //Card number
                                value = {this.state.cardNo}
                                onChangeText = {(value)=>this.setState({cardNo: value})}
                                style={{fontSize: Styles.fontSmall}}
                            />
                        </Item>
                        <TouchableOpacity activeOpacity={1} style={{flexDirection: 'row',...Styles.RowCenterBetween,...Styles.bankSelectButtonStyle}} onPress={this.onSelectButton.bind(this)}>
                            <Text style={{marginLeft: 10, fontSize: Styles.fontSmall, color: Color.textNormal}}>{this.state.selectedValue}</Text>
                            <Icon name={this.state.icon} type='Entypo' style={{color: Color.textNormal}}/>
                        </TouchableOpacity>
                        {this._renderBankLists()}
                        <View style={{marginHorizontal: 15}}>
                        {this.props.provinces && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '选择省份',
                                    value: null,
                                }}
                                items={this.props.provinces}
                                onValueChange={(value, index) => { this.setProvinceCode(value, index)}}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.ProvinceCode}
                            />
                        )}
                        {this.props.cities && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '请选择城市',
                                    value: null,
                                }}
                                items={this.props.cities}
                                onValueChange={(value, index) => { this.setCityCode(value, index)}}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.CityCode}
                            />
                        )}
                        {this.props.districts && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '请选择区',
                                    value: null,
                                }}
                                items={this.props.districts}
                                onValueChange={(value, index) => {
                                    this.setDistrictCode(value, index)
                                }}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.DistrictCode}
                            />
                        )}
                        </View>

                        <Button block style={styles.buttonStyle} onPress={()=>this.onSubmit()}>
                            <Text style={{fontSize: Styles.fontLarge}}>提交</Text>
                        </Button>
                    </Form>
                    <Card transparent >
                    </Card>
                </Content>
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
        marginHorizontal: 15,
    },
});

const styles ={
    contentStyle: {
        backgroundColor:'#f8f8f8',
        flex:1
    },
    itemStyle: {
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37, marginLeft: 15, marginRight: 15
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: Color.LightBlue, marginHorizontal: 15
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {user, provinces, cities, districts} = state.loginForm;
    const {bankObj, bBankSubmitSuccess, bankMsg,bankErrorCode} = state.bindInfoData;
    return {user, provinces, cities, districts, bankObj, bBankSubmitSuccess, bankMsg,bankErrorCode};
};
export default connect(mapStateToProps, {submitBankInfo, getAreaLists, initializeStatus})(VerifyBanks);

