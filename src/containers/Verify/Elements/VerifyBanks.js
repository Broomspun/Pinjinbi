/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity,PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Button, Card,Container, Content, Form, Icon, Input,  Item, Text} from 'native-base';

import {submitBankInfo} from "../../../actions";

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

        this.state = {
            user: this.props.user,
            bankSelectedStatus: false,
            icon: 'chevron-small-right',
            selectedValue:'请选择银行',
            bankName: '',
            cardName: '蓝色',
            cardNo: '6217001210024455220',
            city: '上海',
            branch: '市建设银行分行'
        };
    }
    componentDidUpdate(nextProps){
    }

    componentWillUpdate(){
    }

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
        const {UserId, Token} = this.state.user;
        const {bankName,cardName,cardNo,city, branch} = this.state;

        //Validation

        let address = city+branch;
        this.props.submitBankInfo(UserId, Token, bankName, cardNo, address, cardName);
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
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请选择所在城市"  //City
                                value={this.state.city}
                                style={{fontSize: Styles.fontSmall}}
                                onChangeText = {(value)=>this.setState({city: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                value={this.state.branch}
                                placeholder="请选择入户支行" //district,  branch name: city+branch
                                style={{fontSize: Styles.fontSmall}}
                                onChangeText = {(value)=>this.setState({branch: value})}
                            />
                        </Item>

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
    const {bank_res} = state.bindInfoData;
    return {bank_res};
};
export default connect(mapStateToProps, {submitBankInfo})(VerifyBanks);

