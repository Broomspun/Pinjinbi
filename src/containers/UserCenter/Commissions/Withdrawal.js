import React, {Component} from 'react';
import {Actions} from "react-native-router-flux/";

import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text} from 'react-native'
import {Container, Content, Button, Icon, Item, Input, Form} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

class Withdrawal extends Component {


    constructor(props) {

        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        console.log(props);

        this.state = {
            nChoiceButton: props.wallettype,  //1: commission withdrawal, 2: principal withdrawal
            withdrawalAmount: '',
            accountPassword: ''
        };


    }
    componentDidUpdate() {
        console.log('1',this.props);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.wallettype===2)
            Actions.refresh({title: '本金提现'});
        else
            Actions.refresh({title: '佣金提现'})

    }
    componentDidMount(){
        Actions.refresh({title: '本金提现'});
    }

    _renderButton = ()=> {
        const {nChoiceButton} = this.state;
        let backColor1,backColor2, color1, color2;

        if(nChoiceButton===1) {
            backColor1 = Color.LightBlue;
            backColor2 = 'white';
            color1 = 'white';
            color2 = Color.textNormal;

        } else {
            backColor1 = 'white';
            backColor2 = Color.LightBlue;
            color1 = Color.textNormal;
            color2 = 'white';
        }
        return (
            <View style={{...Styles.RowCenterBetween, paddingHorizontal: 15, paddingVertical: 15}}>
                <Button block rounded style={{backgroundColor: backColor1, paddingHorizontal: 30}}><Text style={{color: color1,  fontSize: Styles.fontLarge}} onPress={()=>this.setState({nChoiceButton: 1})}>佣金提现</Text></Button>
                <Button block rounded style={{backgroundColor: backColor2, paddingHorizontal: 30}}><Text style={{color: color2,  fontSize: Styles.fontLarge}} onPress={()=>this.setState({nChoiceButton: 2})}>本金提现</Text></Button>
            </View>
        )
            // ;
        // Actions.refresh({title: '本金提现'})
    };


    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    <View style={{ paddingVertical: 10, marginVertical: 10, paddingHorizontal: 15}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>提现说明</Text>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>1、佣金50金币起提，平台48小时内完成提现审核</Text>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>2、本金可随时提现，平台48小时内完成提现审核</Text>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>3、申请提现后，相应金币进入冻结</Text>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>4、提现面手续费，有任何问题请联系平台客服</Text>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>5、每日提现次数最多不得超过5次</Text>
                    </View>
                    <View style={{...Styles.cardStyle, ...Styles.RowCenterBetween}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>提现账户：廖北顺   </Text>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>6222*************9783</Text>
                    </View>

                    {this._renderButton()}
                    <View style={{...Styles.cardStyle, ...Styles.RowCenterBetween}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>可提金币：0金 冻结金币：0金</Text>
                    </View>
                    <Form style={{paddingHorizontal: 15}}>
                        <Item regular underline={false} style={Styles.itemStyle}>
                            <Icon style={{color: '#ccc', fontSize: Styles.fontNormal}} active name='yen' type="FontAwesome" />
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入提现金额"
                                value = {this.state.withdrawalAmount}
                                onChangeText = {value => this.setState({withdrawalAmount: value})}
                            />
                        </Item>
                        <Item regular style={Styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.lockIIcon}/>
                            <Input
                                placeholderTextColor='#ccc'
                                secureTextEntry placeholder="请输入登录密码"
                                value = {this.state.accountPassword}
                                onChangeText = {value => this.setState({accountPassword: value})}
                            />
                        </Item>
                        <View style={{...Styles.RowCenterBetween, paddingVertical: 10}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>实际到账：0.00元（1金=0.4元)(手续费：1%）</Text>
                        </View>
                        <Button block style={{...Styles.buttonStyle, marginBottom: 20}} >
                            <Text style={{color: 'white', fontSize: Styles.fontLarge}}>提交</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    return {user, nChoiceButton: state.nChoiceButton};
};
export default connect(mapStateToProps, {})(Withdrawal);
