import React, {Component} from 'react';
import Timer from 'react-timer-mixin';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, Dimensions} from 'react-native'
import Modal from 'react-native-modal'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import connect from "react-redux/es/connect/connect";
import {getLotoPlayActivities,trialLoto} from "../../actions";

class Loto extends Component {
    state = {visibleLotoFailModal: false};
    constructor(props) {
        super(props);


        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {bLotoTrialFail: false};

        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            this.props.getLotoPlayActivities(UserId, Token);
        }
    }
    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.trialLotoMsg!=='') {
            this.setState({visibleLotoFailModal: true})
        }

    }

    componentDidUpdate() {
        if(this.state.visibleLotoFailModal) {
            Timer.setTimeout(() => {
                this.setState({visibleLotoFailModal: false})
            }, 5000);
        }
    }

    _renderLotoModal = () => (
        <View style={{borderRadius: 10, width: 300, height: 240, backgroundColor: 'white', paddingVertical: 40 }}>
            <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 20, color:'#e84e40', fontSize: Styles.fontLarge, fontWeight: '700'}}>{this.props.trialLotoMsg}</Text>
                <View style={{ borderColor: '#e84e40', width: 90, height: 90, borderWidth: 0, borderRadius: 50,justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Images.loto_fail_icon} style={{width: 64, height: 64}} />
                </View>
            </View>
            <View style={{paddingHorizontal: 15, paddingBottom: 20}}>
                <Button block style={{backgroundColor: Color.LightBlue1, paddingHorizontal: 20}} onPress={()=>{this.setState({visibleLotoFailModal: false})}}>
                    <Text style={{color: 'white', fontSize: Styles.textLarge}}>确认</Text>
                </Button>
            </View>
        </View>
    );

    onButtonPress(){

    }

    _onStartTrialLoto = ()=> {
        if(this.props.user && this.props.lotoObj.RemainingNum>0) {
            const {UserId, Token} = this.props.user;
            this.props.trialLoto(UserId, Token, this.props.lotoObj.ActivitiesId);
        }
    };

    _renderRemainingButton =()=>{
        if(this.props.lotoObj) {
            return (
                <Button rounded style={{backgroundColor: '#ffeded', alignSelf: 'center'}}>
                    <Text style={{color: '#f8655e', fontSize: Styles.fontLarge, paddingHorizontal: 20}}>剩{this.props.lotoObj.RemainingNum}次抽奖机会</Text>
                </Button>
            )
        }

    };

    render() {
        const {height} = Dimensions.get('screen');
        return(
            <Container >
                <Content>
                    <View style={{...Styles.ColumnCenter, position: 'relative'}}>
                        <View >
                            <Modal  isVisible={this.state.visibleLotoFailModal} style={{...Styles.ColumnCenter}}>
                                {this._renderLotoModal()}
                            </Modal>
                            <View style={{width: Styles.width,...Styles.ColumnCenterBottom,}}>
                                <Image source={Images.lotoBackTop} style={{width: Styles.width, height: (height-150)/2}}/>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#f8655e'}}>
                            <View style={{width: Styles.width, backgroundColor:'#f8655e',...Styles.ColumnCenterBottom, paddingTop: 180}}>
                                {this._renderRemainingButton()}
                            </View>
                            <View style={{marginHorizontal: 15, paddingVertical: 20}}>
                                <View style={{paddingVertical: 20}}>
                                    <Text style={{color: 'white'}}>活动规则</Text>
                                </View>
                                <View style={{backgroundColor: 'white', borderRadius: 5, padding: 10}}>
                                    <Text style={{padding: 5,color: Styles.textNormal}}>1、活动时间：2018年8月18日-2018年9月10日</Text>
                                    <Text style={{padding: 5,color: Styles.textNormal}}>2、参与本次活动抽奖每次扣除10积分，不得超过3次。</Text>
                                    <Text style={{padding: 5,color: Styles.textNormal}}>3、奖品发放：奖品于活动结束后7个工作日内发放。</Text>
                                    <Text style={{padding: 5,color: Styles.textNormal}}>4、如有问题可拨打客服电话咨询。</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...Styles.ColumnCenter, position: 'absolute',zIndex:11, top: (height/2-100)}}>
                            {/*<TouchableOpacity style={{...Styles.ColumnCenter}} onPress={()=> this.setState({visibleLotoFailModal: true})}>*/}
                            <TouchableOpacity style={{...Styles.ColumnCenter}} onPress={()=>this._onStartTrialLoto()}>
                                <Image source={Images.lotoStart}  style={{width: 50, height: 50}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...Styles.ColumnCenter, position: 'absolute', top:140, backgroundColor:  'transparent', left: 0, right: 0,zIndex: 10}}>
                            <Image source={Images.lotoBakcground} style={{width: 300, height:300 }}/>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {lotoObj, bLotoLoading,trialLotoResult,bTrialing,trialLotoMsg,ActivitiesId} = state.lotoReducer;
    return {user, lotoObj, bLotoLoading, trialLotoResult,bTrialing,trialLotoMsg,ActivitiesId};
};
export default connect(mapStateToProps, {getLotoPlayActivities, trialLoto})(Loto);
