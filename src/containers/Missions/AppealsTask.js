import React, {Component} from 'react';
import {Platform, UIManager, View, Image, TouchableOpacity, Alert, PixelRatio} from 'react-native'
import {connect} from 'react-redux';
import Modal from "react-native-modal";
import {Button, Container, Content, Text, Textarea} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {initializeStatus, getApplyStatementType, initiateAppeal} from "../../actions";
import { SelectMultipleButton } from 'react-native-selectmultiple-button'
import ImagePicker from "react-native-image-picker";

import Timer from 'react-timer-mixin';
import {Actions} from "react-native-router-flux";
import {
    INITIALIZE_GET_APPEAL_INFO_STATUS, INITIALIZE_INITIATE_APPEAL_STATUS,
} from "../../actions/types";

class AppealsTask extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {QuestionImgF: null, QuestionImgS: null, QuestionImgT: null, AppealMsg:'', bShowDisputeModal: false,
            selectedDisputeOption: '', bShowSubmitStatusModal: false
        };

        this.props.getApplyStatementType();
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.initialteAppealStatus!==null && nextProps.initialteAppealStatus) {
            this.setState({bShowSubmitStatusModal: true});
        }
    }

    componentWillUnmount() {
    }

    _singleTapDisputeButtons = (valueTap, option, index)=>{
        this.setState({
            bShowDisputeModal: false
        });

        const {UserId, Token} = this.props.user;
        const {AppealMsg,QuestionImgF,QuestionImgS,QuestionImgT} = this.state;
        this.props.initiateAppeal(UserId, Token,this.props.taskObj.TaskAcceptNo,index, AppealMsg, QuestionImgF, QuestionImgS, QuestionImgT);
    };

    showDisputeModal() {
        let disputeOptions;
        if(this.props.getApplyStatementTypeObj===null) {
            return (
                <View></View>
            )
        }

        if(this.props.getApplyStatementTypeObj) {

            disputeOptions = this.props.getApplyStatementTypeObj.map(option => {
                return option.TypeText
            });

            let disputeModalContents = disputeOptions.map((option, index) => (
                <SelectMultipleButton
                    key={option}
                    value={option}
                    buttonViewStyle={{
                        borderRadius: 20,
                        height: 36,
                        paddingHorizontal: 15
                    }}
                    highLightStyle={{
                        borderColor: "gray",
                        backgroundColor: "transparent",
                        textColor: Color.LightBlue,
                        borderTintColor: Color.LightBlue,
                        backgroundTintColor: Color.LightBlue,
                        textTintColor: "white"
                    }}
                    selected={this.state.selectedDisputeOption === option}
                    singleTap={valueTap =>
                        this._singleTapDisputeButtons(valueTap, option, index)
                    }
                />
            ))


            if(disputeOptions) {
                return (
                    <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                        <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                            <Text style={{color: 'white', fontSize: Styles.fontNormal}}>请选择申诉类型</Text>
                        </View>
                        <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30, paddingTop: 10}}>
                            {disputeModalContents}
                        </View>
                    </View>
                )
            }
        }
    }

    selectPhotoTapped(id) {
        const options = {
            title:'选择一张照片',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从相册选取',
            cancelButtonTitle:'取消',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: `data:${response.type};base64,` + response.data };

                switch (id) {
                    case 1:
                        this.setState({
                            QuestionImgF: source
                        });
                        break;
                    case 2:
                        this.setState({
                            QuestionImgS: source
                        });
                        break;
                    case 3:
                        this.setState({
                            QuestionImgT: source
                        });
                        break;
                }
            }
        });
    }

    onSubmitDispute = () => {
        if(this.state.AppealMsg==='') {
            Alert.alert(
                '失败',
                'Please fill dispute reason',
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_GET_APPEAL_INFO_STATUS)},

                ],
            );
            return;
        }

        if(this.state.QuestionImgF===null || this.state.QuestionImgS===null || this.state.QuestionImgT===null) {
            Alert.alert(
                'Question',
                'Will you file dispute without images',
                [
                    {text: 'OK', onPress: () => {
                            this.props.initializeStatus(INITIALIZE_GET_APPEAL_INFO_STATUS);
                            this.setState({bShowDisputeModal: true});
                        }},
                    {text: 'Cancel', onPress: () => {
                            console.log('Cancel Pressed')}, style: 'cancel'},
                ],
                {cancelable: false}
            );
        }
    };

    onShowDisputeLists = () =>{
        this.props.initializeStatus(INITIALIZE_INITIATE_APPEAL_STATUS);
        this.setState({bShowSubmitStatusModal: false});
        Actions.appealsList();
    };

    showSubmitStatusModal = () => {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>温馨提示</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.textNormal, paddingVertical: 30}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>{this.props.initialteApplealMsg}</Text>
                    </View>
                    <View style={{ ...Styles.ColumnCenter, alignItems: 'center', marginTop: 30}}>
                        <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.onShowDisputeLists()}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <Modal  isVisible={this.state.bShowDisputeModal} style={{...Styles.ColumnCenter}}>
                        {this.showDisputeModal()}
                    </Modal>
                    <Modal  isVisible={this.state.bShowSubmitStatusModal} style={{...Styles.ColumnCenter}}>
                        {this.showSubmitStatusModal()}
                    </Modal>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingBottom: 10}}>
                            <Text style={{...Styles.normalTextStyle}}>申诉类型</Text>
                        </View>
                        <View  style={{flex:1, ...Styles.RowCenterLeft, paddingVertical: 10}}>
                            <Textarea value={this.state.AppealMsg} style={{flex:1}}
                                      bordered placeholder="请简要填写申诉说明" rowSpan={5}
                                      onChangeText={(value)=>this.setState({AppealMsg: value})}
                            />
                        </View>
                    </View>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingTop: 10, paddingBottom: 20}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex:1,marginRight: 6}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(1)}>
                                    { this.state.QuestionImgF === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.QuestionImgF} />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                    { this.state.QuestionImgS === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.QuestionImgS} />
                                    }
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                    { this.state.QuestionImgT === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.QuestionImgT} />
                                    }
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1, marginRight:3}}>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
                        <TouchableOpacity activeOpacity={.7}
                                          onPress={()=>this.onSubmitDispute()}
                                          style={{borderRadius: 3, flex:1, paddingVertical: 8, backgroundColor: Color.LightBlue}} block>
                            <Text style={{alignSelf: 'center', color: 'white', fontSize: Styles.fontNormal}}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskObj, getApplyStatementTypeObj, getApplyStatementTypeStatus,
        initiateAppealObj, initialteAppealStatus,initialteApplealMsg
    } = state.taskReducer;
    return {user, taskObj, getApplyStatementTypeObj, getApplyStatementTypeStatus, initiateAppealObj, initialteAppealStatus,initialteApplealMsg};
};

export default connect(mapStateToProps, {initializeStatus, getApplyStatementType, initiateAppeal})(AppealsTask);

