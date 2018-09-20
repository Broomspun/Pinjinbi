import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager, Image, View, Text, Clipboard, PixelRatio} from 'react-native';

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'
import {getMemberByInvite} from "../../actions";
import Modal from "react-native-modal";
class Promotion extends Component {

    componentWillMount(){
    }

    constructor(props) {
        super(props);
        this.state = {bClipboardShowAlertModal: false}
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token} = this.props.user;

            this.props.getMemberByInvite(UserId, Token);
        }
    }
    writeToClipboard = async (shareURL) => {

        await Clipboard.setString(shareURL);
        this.setState({bClipboardShowAlertModal: true})
    };
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: Color.mainBackground, paddingTop: 15, marginBottom: 10}}>
                    <CardBlock cardTitle="我的邀请码" cardTitleColor={Color.textNormal} cardValue='131143002' cardValueColor={Color.textInfoBlue}/>
                    <CardBlock cardTitle="已完成任务单数" cardTitleColor={Color.textNormal} cardValue='1' cardValueColor={Color.textInfoBlue}/>
                    <CardBlock cardTitle="推广总数" cardTitleColor={Color.textNormal} cardValue='0' cardValueColor={Color.textInfoOrange}>
                        <Text style={{alignSelf:'flex-end', color: Color.textNormal}}>个</Text>
                    </CardBlock>
                    <Modal  isVisible={this.state.bClipboardShowAlertModal} style={{...Styles.ColumnCenter}}>
                        {this._renderClipboardShowAlertModal()}
                    </Modal>
                    <View style={Styles.cardStyleColumn}>
                        <View style={cardStyle_1}>
                            <Text style={{color: Color.textNormal, marginRight:20}}>徒弟</Text>
                            <Text style={{color: Color.textNormal}}>邀请人可获得徒弟任务佣金的</Text>
                            <Text style={{color: Color.textInfoOrange}}>10%</Text>
                        </View>
                        <View style={{flex: 1, flexDirection:'row'}}>
                            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 24, paddingHorizontal: 10}}>
                                <Text style={{fontSize: Styles.fontLarge, color: Color.textInfoOrange}}>0人</Text>
                                <Text style={textBlockDownStyle}>已注册</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingVertical: 24, paddingHorizontal: 10}}>
                                <Text style={{fontSize: Styles.fontLarge, color: Color.textInfoOrange}}>0人</Text>
                                <Text style={textBlockDownStyle}>已注册</Text>
                            </View>
                        </View>
                    </View>
                    <CardBlock cardTitle="累计奖励" cardTitleColor={Color.textNormal} cardValue='0.00' cardValueColor={Color.textInfoOrange}>
                        <Text style={{alignSelf:'flex-end', color: Color.textNormal}}>金</Text>
                    </CardBlock>
                    <Image source={Images.promotion} style={{height: 180, width: null, flex: 1}}/>
                    <View style={{paddingHorizontal: 15, marginTop: 10, marginBottom: 20}}>
                        <Button block style={Styles.buttonStyle} onPress = {()=>this.props.inviteObj?this.writeToClipboard(this.props.inviteObj.ShareUrl):null}>
                            <Text style={{fontSize: Styles.fontLarge, color:'white'}}>立即分享</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
    _renderClipboardShowAlertModal = () => (
        <View style={{flex:1,width: null, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
            <View style={{flex: 1,borderTopLeftRadius:10, borderTopRightRadius: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                <Text style={{color: 'white', fontSize: Styles.fontLarge}}>Clip Board Copy</Text>
            </View>
            <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.textNormal, paddingVertical: 20}}>
                    <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>Success Copied</Text>
                </View>
                <View style={{ ...Styles.ColumnCenter, alignItems: 'center', marginTop: 30}}>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.setState({bClipboardShowAlertModal: false})}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = {
    cardStyle_1:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        paddingBottom: 10,
        borderColor:
        Color.borderNormal,
        borderBottomWidth:1
    },
    textBlockDownStyle: {fontSize: Styles.fontLarge, color: Color.textInfoOrange, borderTopWidth:1, borderColor: Color.borderNormal},
};

const {cardStyle_1,textBlockDownStyle} = styles;


const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {inviteObj} = state.memberReducer;
    return {user, inviteObj}
};
export default connect(mapStateToProps, {getMemberByInvite})(Promotion);
