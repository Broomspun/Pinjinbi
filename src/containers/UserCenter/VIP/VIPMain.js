/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View, PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Actions} from "react-native-router-flux";
import { Button, Container, Content, Text, Footer } from 'native-base';
import Modal from "react-native-modal";


class VIPMain extends Component {

    constructor(props){
        super(props);
        this.state = {
            bShowAlertModal: false,
            bShowVIPModal: false,
            bShowVIPSubmitModal: false,
            buttonText: '立即付款150金',
            selectedMonth: 6,
            selectedMoney: 150,
            button6Select: true,
            buttonSelectBackColor: '#ff682d',
            buttonUnSelectBackColor: '#ffa800',
        }
    }

    componentWillReceiveProps(nextProps){
    }

    _toggleVIPModal = () => {
        if(this.props.user && this.props.user.Level==='L0')
            this.setState({bShowAlertModal: true})
        else
            this.setState({bShowVIPModal: !this.state.bShowVIPModal});
    };


    componentWillUpdate(){
    }
    _renderVIPModal =() =>{
        const {buttonSelectBackColor,buttonUnSelectBackColor,button6Select,buttonText} = this.state;

        return (
            <View style={{...Styles.ColumnCenter, width: '100%', maxHeight: 450, borderRadius: 10, backgroundColor:'white', paddingBottom: 30, paddingHorizontal: 15 }}>
                <View style={{paddingVertical: 25}}>
                    <Text style={{color: '#39005a'}}>选择VIP套餐</Text>
                </View>
                <View style={{paddingVertical: 35, borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border,borderTopWidth: 1/PixelRatio.get(), borderTopColor: Color.Border}}>
                    <View style={{...Styles.RowCenter, alignItems: 'center'}}>
                        <Button rounded style={{marginRight: 30, backgroundColor: button6Select ? buttonSelectBackColor: buttonUnSelectBackColor, paddingHorizontal: 30}} onPress={()=>this.setState({buttonText: '立即付款150金', button6Select: true,selectedMonth:6,selectedMoney: 150})}>
                            <Text style={{color: 'white'}}>6个月</Text>
                        </Button>
                        <Button rounded style={{backgroundColor: button6Select ? buttonUnSelectBackColor: buttonSelectBackColor, paddingHorizontal: 30}} onPress={()=>this.setState({buttonText: '立即付款80金',button6Select: false, selectedMonth: 3,selectedMoney: 80})}>
                            <Text style={{color: 'white'}}>3个月</Text>
                        </Button>
                    </View>
                </View>
                <View style={{paddingVertical: 35}}>
                    <Button style={{backgroundColor: Color.LightBlue1, paddingHorizontal: 20}} onPress={()=>{this._toggleVIPModal(); this.setState({bShowVIPSubmitModal: true})}}>
                        <Text style={{color: 'white'}}>{buttonText}</Text>
                    </Button>
                </View>
            </View>
        )
    };
    onSubmitVIPInfo = ()=> {

    };

    _renderSubmitModal = ()=>{
        return (
            <View style={{width: '100%',marginHorizontal: 15, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
                <View style={{flex: 1,borderTopLeftRadius:10, borderTopRightRadius: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontLarge}}>温馨提醒</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.textNormal, paddingVertical: 30}}>
                        <Text style={{alignSelf: 'center',color:Color.textNormal, fontSize: Styles.fontNormal}}>您购买拼金币{this.state.selectedMonth}个月套餐，</Text>
                        <Text style={{alignSelf: 'center',color:Color.textNormal, fontSize: Styles.fontNormal}}>需支付{this.state.selectedMoney}金币</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <Button onPress={()=>this.setState({bShowVIPSubmitModal: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontLarge,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}} onPress={this.onSubmitVIPInfo.bind(this)}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>
        )
    };

    _renderShowAlertModal = () => (
        <View style={{flex:1,width: null, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
            <View style={{flex: 1,borderTopLeftRadius:10, borderTopRightRadius: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                <Text style={{color: 'white', fontSize: Styles.fontLarge}}>温馨提醒</Text>
            </View>
            <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.textNormal, paddingVertical: 30}}>
                    <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>用户等级至少要LV1才能开通VIP</Text>
                </View>
                <View style={{ ...Styles.ColumnCenter, alignItems: 'center', marginTop: 30}}>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.setState({bShowAlertModal: false})}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>
        </View>
    );

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content style={{...Styles.mt15}}>
                    <Modal  isVisible={this.state.bShowAlertModal} style={{...Styles.ColumnCenter}}>
                        {this._renderShowAlertModal()}
                    </Modal>

                    <Modal  isVisible={this.state.bShowVIPModal} style={{...Styles.ColumnCenter}}>
                        {this._renderVIPModal()}
                    </Modal>

                    <Modal  isVisible={this.state.bShowVIPSubmitModal} style={{...Styles.ColumnCenter}}>
                        {this._renderSubmitModal()}
                    </Modal>

                    <View  style={{backgroundColor: '#39005a', paddingHorizontal: 15, paddingVertical: 15}}>
                        <View style={{backgroundColor: 'white', borderRadius:15, paddingVertical: 25, paddingHorizontal: 20}}>
                            <View style={{...Styles.ColumnCenter, borderBottomColor: '#39005a', paddingBottom: 20, borderBottomWidth: 1/PixelRatio.get(), borderStyle: 'dashed'}}>
                                <Text style={{fontSize: Styles.fontLarge, color: '#39005a'}}>加入拼金币VIP</Text>
                                <Text style={{fontSize: Styles.fontLarge, color: '#39005a'}}>享受账号垫付任务</Text>
                            </View>
                            <View style={{paddingTop: 20}}>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>入会须知：</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>1、拼金币等级满LV1</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>2、拥有一个额外的满半年豆豆3心非乱码淘宝号京东不限等级）</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>3、高度的责任心，避免串号</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>4、在账号信息中会员，最多可增加2个淘宝号和2个京东好</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>5、第一次加入VIP，请5天是账号审核期，在此期间绑定完成申请第六天开始计时</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>6、到期之后请续费，否则会员资格自动取消</Text>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>7、会员中途不得以任何理由要求退回管理费</Text>
                            </View>
                        </View>
                    </View>
                    <View  style={{backgroundColor: '#39005a', paddingHorizontal: 15, paddingVertical: 15, marginTop: 15}}>
                        <View style={{backgroundColor: 'white', borderRadius:15, paddingVertical: 25, paddingHorizontal: 20}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>收费方式</Text>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>3个月80金币</Text>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>6个月150金币</Text>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>费用一次性从佣金账户扣除，yu额不够请先做任务
                                赚金请认真阅读以上要点</Text>
                        </View>
                    </View>
                    <View style={{flex:1, backgroundColor:'white', paddingVertical: 10, paddingHorizontal: 15}}>
                        {/*<Button block style={{backgroundColor: Color.LightBlue1}} onPress = {()=>this.setState({bShowAlertModal: true})}>*/}
                            {/*<Text style={{color: 'white', fontSize: Styles.fontLarge}}>Level check(testing)</Text>*/}
                        {/*</Button>*/}
                        <Button block style={{backgroundColor: Color.LightBlue1}}  onPress={()=>this._toggleVIPModal()}>
                            <Text style={{color: 'white', fontSize: Styles.fontLarge}}>同意加入</Text>
                        </Button>
                    </View>

                </Content>

            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {id_res} = state.bindInfoData;
    const {user} = state.loginForm;
    return {id_res, user};
};
export default connect(mapStateToProps, {})(VIPMain);

