import React, {Component} from 'react';
import {Platform, UIManager, View, Image, PixelRatio, TouchableOpacity, Alert} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, Text} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";

import {getMemberTaskAccept, initializeStatus, loadOperationTask, remindingrefunds,completeTask} from "../../actions";

import {
    INITIALIZE_COMPLETE_TASK_STATUS, INITIALIZE_REMINDING_REFUNDS_STATUS,
    INITIALIZE_TASK_LIST_STATUS
} from "../../actions/types";

import {Actions} from "react-native-router-flux";

class AcceptedAdvancedTask extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {bShowNoticeModal: false, bShowEvaluation: false,
            EvaluationImg: null, EvaluationImg1: null, EvaluationImg2: null,
            bShowSubmitCompleteModal: false
        };

        if(this.props.user && (this.props.taskObj ||  this.props.loadTaskObj || props.TaskAcceptNo)) {
            const {taskObj} = this.props;
            const {UserId, Token}  = this.props.user;

            if(props.task_step===1)
                this.props.loadOperationTask(UserId, Token, taskObj.TaskAcceptNo);
            // this.props.getMemberTaskAccept(UserId, Token,taskObj.TaskAcceptNo);
            else {
                if(!this.props.loadTaskObj)
                    this.props.loadOperationTask(UserId, Token, this.props.TaskAcceptNo);
            }
        }
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        console.log('Accepted Advanced', nextProps);

        if(nextProps.remindingRefundsStatus!==null){
            this.setState({bShowNoticeModal: true});
            this.props.initializeStatus(INITIALIZE_REMINDING_REFUNDS_STATUS);
        }

        if(nextProps.complateTaskStatus!==null){
            this.setState({bShowSubmitCompleteModal: true});
            this.props.initializeStatus(INITIALIZE_COMPLETE_TASK_STATUS);
            const {UserId, Token}  = this.props.user;
            if (nextProps.complateTaskStatus)
                this.props.loadOperationTask(UserId, Token, this.props.loadTaskObj.TaskAcceptNo);
        }
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
    }

    onNoticePayment =()=>{
        const {UserId, Token}  = this.props.user;
        this.props.remindingrefunds(UserId, Token, this.props.loadTaskObj.TaskAcceptNo);
    };

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
                            EvaluationImg: source
                        });
                        break;
                    case 2:
                        this.setState({
                            EvaluationImg1: source
                        });
                        break;
                    case 3:
                        this.setState({
                            EvaluationImg2: source
                        });
                        break;
                }
            }
        });
    }


    renderConnect() {
        return (<View style={{flex:1, height: null, width: 2,alignSelf:'center', borderLeftWidth:4/PixelRatio.get(), borderColor: Color.textNormal}}></View>);
    }
    renderConnect1() {
        return (<View style={{flex:1, height: null, width: 2,alignSelf:'center', borderLeftWidth:4/PixelRatio.get(), borderColor: '#73cd6c'}}></View>);
    }

    _renderNoticeStatusModal =()=> {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 130, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{ ...Styles.RowCenterBetween, alignItems: 'center', marginTop: 30}}>
                        <Text>{this.props.remindingRefundsMsg || '提示商家返款'}</Text>
                    </View>
                    <View style={{...Styles.RowCenter, marginTop: 30}}>
                        <Button small style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.setState({bShowNoticeModal: false})}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };

    _renderSubmitCompleteStatusModal =()=> {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 130, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{ ...Styles.RowCenterBetween, alignItems: 'center', marginTop: 30}}>
                        <Text>{this.props.complateTaskMsg || '确认收货成功，等待商家审核返佣金'}</Text>
                    </View>
                    <View style={{...Styles.RowCenter, marginTop: 10}}>
                        <Button small style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.setState({bShowSubmitCompleteModal: false})}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };

    onSubmitEvaluation = ()=> {
      const {EvaluationImg, EvaluationImg1, EvaluationImg2} = this.state;

        if(!EvaluationImg || !EvaluationImg1 && !EvaluationImg2){
            Alert.alert(
                '失败',
                'Please choose all 3 images',
                [
                    {text: 'OK', onPress: () => console.log('pressed')},
                ],
                {cancelable: false}
            );
            return;
        }

        let OkImgJson = {
            "EvaluationImg": EvaluationImg.uri,
            "EvaluationImg1": EvaluationImg1.uri,
            "EvaluationImg2": EvaluationImg2.uri,
        };
        const {UserId, Token}  = this.props.user;
        this.props.completeTask(UserId, Token, this.props.loadTaskObj.TaskAcceptNo, JSON.stringify(OkImgJson));
    };

    render() {
        const {loadTaskObj} = this.props;

        if(loadTaskObj===null){
            return (
                <Container style={{backgroundColor: Color.LightGrayColor}}>
                    <Content style={{marginBottom: 10}}>
                    </Content>
                </Container>
            )
        }

        let imgs = null;
        if(loadTaskObj.ImgJson!=='')
            imgs = JSON.parse(loadTaskObj.ImgJson);

        let firstButtonTitle ='操作任务';
        if(this.props.loadTaskObj.AcceptTaskStatus===1)
            firstButtonTitle ='重新提交';
        let bDisabledFirst = true;
        let bDisabledThird = true;

        if (loadTaskObj.AcceptTaskStatus===0 || loadTaskObj.AcceptTaskStatus===1)
            bDisabledFirst = false;

        if (loadTaskObj.AcceptTaskStatus===0 || loadTaskObj.AcceptTaskStatus===1)
            bDisabledThird = false;
        let countdown="00:05:00";

        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <Modal  isVisible={this.state.bShowNoticeModal} style={{...Styles.ColumnCenter}}>
                        {this._renderNoticeStatusModal()}
                    </Modal>
                    <Modal  isVisible={this.state.bShowSubmitCompleteModal} style={{...Styles.ColumnCenter}}>
                        {this._renderSubmitCompleteStatusModal()}
                    </Modal>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingBottom: 10}}>
                            <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                <Text style={{...Styles.normalTextStyle}}>商家名称: </Text>
                                <Text style={{...Styles.normalTextStyle}}>{loadTaskObj.SellerName} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingBottom: 15}}>
                            <View style={{...Styles.RowCenterBetween}}>
                                <View style={{flex:1, ...Styles.RowCenterLeft}}>
                                    <Text style={{...Styles.normalTextStyle, marginRight: 20}}>目标商品</Text>
                                    <Text style={{...Styles.normalTextStyle}}>平台返款</Text>
                                </View>
                                <View style={{flex:1, ...Styles.RowCenterRight}}>
                                    <Text style={{...Styles.normalTextStyle, marginRight: 20}}>任务状态: </Text>
                                    <Text style={{...Styles.normalTextStyle}}>{loadTaskObj.AcceptTaskStatusText}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:1, ...Styles.RowCenterLeft, paddingVertical: 10}}>
                            <View style={{flex: 1}}>
                                <Image source={Images.product} style={{ height: 60, width: 60}}/>
                            </View>
                            <View style={{flex:4, marginLeft: 5}}>
                                <View>
                                    <View style={{...Styles.RowCenterBetween}}>
                                        <View style={{...Styles.RowCenterLeft}}>
                                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmaller}}>单件商品成交价: </Text>
                                            <Text style={{color: Color.orangeColor, fontSize:Styles.fontSmaller}}>{loadTaskObj.ProductPrice}元</Text>
                                        </View>
                                        <View style={{...Styles.RowCenterRight}}>
                                            <Text style={{color: Color.orangeColor, fontSize:Styles.fontSmaller}}>提交倒计时: {countdown} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmaller}}>件数或规格 </Text>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmaller, marginLeft: 10}}>{loadTaskObj.ProductNum}件</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 15, paddingVertical: 15}}>
                        <Text style={{paddingTop: 10, color: '#e00000', fontSize: Styles.fontSmall, flexWrap: 'wrap'}}>商家要求：请直接复制口令打开淘宝，点击进入-下单。谢谢！</Text>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingVertical: 15}}>
                            <View style={{...Styles.RowCenterBetween}}>
                                <View style={{flex: 1}}>
                                    {bDisabledFirst && (
                                        <Button small disabled
                                                style={{
                                                    borderRadius: 30,
                                                    alignSelf: 'flex-start',
                                                }}
                                        >
                                            <Text style={{color: 'white'}}>{firstButtonTitle}</Text>
                                        </Button>
                                    )}
                                    {!bDisabledFirst && (
                                        <Button small onPress={()=> Actions.loadOperationalAdvancedTask()}
                                                style={{
                                                    borderRadius: 30,
                                                    backgroundColor: Color.DarkLightBlue,
                                                    alignSelf: 'flex-start',
                                                }}
                                        >
                                            <Text style={{color: 'white'}}>{firstButtonTitle}</Text>
                                        </Button>
                                    )}

                                </View>
                                <View style={{flex: 1}}>
                                    {this.props.loadTaskObj.AcceptTaskStatus!==4 && (
                                        <Button disabled small
                                                style={{
                                                    borderRadius: 30,
                                                    alignSelf: 'center',
                                                }}
                                        >
                                            <Text style={{color: 'white'}}>申诉任务</Text>
                                        </Button>
                                    )}

                                    {this.props.loadTaskObj.AcceptTaskStatus===4 && (
                                        <Button small onPress={()=>Actions.appealsTask()}
                                                style={{
                                                    borderRadius: 30,
                                                    alignSelf: 'center',
                                                }}
                                        >
                                            <Text style={{color: 'white'}}>申诉任务</Text>
                                        </Button>
                                    )}

                                </View>
                                <View style={{flex: 1}}>
                                    {bDisabledFirst && (
                                        <Button small disabled
                                                style={{
                                                    borderRadius: 30,
                                                    alignSelf: 'flex-end',
                                                }}
                                        >
                                            <Text style={{color: 'white'}}>取消任务</Text>
                                        </Button>
                                    )}

                                    {!bDisabledThird && (
                                        <Button small onPress={()=>Actions.cancelTask()}
                                                style={{
                                                    borderRadius: 30,
                                                    backgroundColor: Color.DarkLightBlue,
                                                    alignSelf: 'flex-end',
                                                }}
                                        >
                                            <Text style={{color: 'white'}}>取消任务</Text>
                                        </Button>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{flex:1, flexDirection: 'row' }}>
                            <View style={{flex:1, paddingBottom:3}}>
                                <View style={{marginBottom: 3, borderColor: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24, alignSelf: 'center'}}>
                                    <Text style={{alignSelf: 'center',color:'#73cd6c'}}>1</Text>
                                </View>
                                {  !imgs &&
                                this.renderConnect()
                                }
                                {  imgs &&
                                this.renderConnect1()
                                }

                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>接受任务 </Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{loadTaskObj.CreateTime}</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>任务ID</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{loadTaskObj.TaskAcceptNo}</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>商品金额</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>{loadTaskObj.Amount}元</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>用户名</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{loadTaskObj.AccountName }</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1, paddingBottom: 3}}>
                                <View style={{marginBottom:3,borderColor: !imgs ? Color.textLight: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24, alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: 'center', color:! imgs ? Color.textLight: '#73cd6c'}}>2</Text>
                                </View>
                                {  !imgs &&
                                this.renderConnect()
                                }
                                {  imgs &&
                                this.renderConnect1()
                                }
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textLight, fontSize:Styles.fontNormal}}>订单付款 </Text>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>货比三家</Text></View>
                                        <View style={{flex:7}}>

                                            <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                {imgs && imgs.SearchPageImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.SearchPageImg}} />
                                                )}
                                                {imgs && !imgs.SearchPageImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                )}
                                                {imgs && imgs.OtherShopProBottomImgA && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.OtherShopProBottomImgA}} />
                                                )}
                                                {imgs && !imgs.OtherShopProBottomImgA && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                )}
                                                {imgs && imgs.OtherShopProBottomImgB && (
                                                    <Image style={{width: 30, height: 30}} source={{uri: imgs.OtherShopProBottomImgB}} />
                                                )}
                                                {imgs && !imgs.OtherShopProBottomImgB && (
                                                    <Image style={{width: 30, height: 30, }} source={Images.placeholder} />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>浏览店铺</Text></View>
                                        <View style={{flex:7}}>

                                            <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                {imgs && imgs.TargetProductTopImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.TargetProductTopImg}} />
                                                )}
                                                {imgs && !imgs.TargetProductTopImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                )}
                                                {imgs && imgs.TargetProductBottomImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.TargetProductBottomImg}} />
                                                )}
                                                {imgs && !imgs.TargetProductBottomImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                )}
                                                {imgs && imgs.ShopProductBottomImgA && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.ShopProductBottomImgA}} />
                                                )}
                                                {imgs && !imgs.ShopProductBottomImgA && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                )}
                                                {imgs && imgs.ShopProductBottomImgB && (
                                                    <Image style={{width: 30, height: 30}} source={{uri: imgs.ShopProductBottomImgB}} />
                                                )}
                                                {imgs && !imgs.ShopProductBottomImgB && (
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                )}
                                            </View>

                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>收藏店铺</Text></View>
                                        <View style={{flex:7}}>
                                            <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                {imgs && imgs.ShopCollectionImg && (
                                                    <Image style={{width: 30, height: 30}} source={{uri: imgs.ShopCollectionImg}} />
                                                )}
                                                {imgs && !imgs.ShopCollectionImg && (
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                )}

                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>加入购物车</Text></View>
                                        <View style={{flex:7}}>
                                            <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                {imgs && imgs.ShoppingCartImg && (
                                                    <Image style={{width: 30, height: 30}} source={{uri: imgs.ShoppingCartImg}} />
                                                )}
                                                {imgs && !imgs.ShoppingCartImg && (
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>加入购物车</Text></View>
                                        <View style={{flex:7}}>
                                            <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                {imgs && imgs.MerchantChatImg && (
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.MerchantChatImg}} />
                                                )}
                                                {imgs && !imgs.MerchantChatImg && (
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                )}
                                                {imgs && imgs.OrderDetailsImg && (
                                                    <Image style={{width: 30, height: 30}} source={{uri: imgs.OrderDetailsImg}} />
                                                )}
                                                {imgs && !imgs.OrderDetailsImg && (
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:1, ...Styles.RowCenterRight}}>
                                            <Button rounded light small>
                                                <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>点击可查看图片</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1, paddingBottom: 3}}>
                                <View style={{marginBottom:3, borderColor: !this.props.loadTaskObj.IsReminders ? Color.textLight: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24,  alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: 'center', color: !this.props.loadTaskObj.IsReminders ? Color.textLight: '#73cd6c'}}>3</Text>
                                </View>
                                {!this.props.loadTaskObj.IsReminders &&
                                this.renderConnect()
                                }
                                {this.props.loadTaskObj.IsReminders &&
                                this.renderConnect1()
                                }
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontNormal}}>商家确认订单</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}></Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>淘宝订单号</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>淘宝订单</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>返款方式</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>平台返款</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>返款账号</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{loadTaskObj.PlatOrderNo }</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>返款金额</Text></View>
                                        <View style={{flex:7}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>{loadTaskObj.Amount}元</Text></View>
                                    </View>
                                </View>
                                {!this.props.loadTaskObj.IsReminders && (
                                    <View style={{flex:1, paddingTop: 15}}>
                                        <View style={{...Styles.RowCenterLeft}}>
                                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                                <Text style={{color: Color.textLight, fontSize:Styles.fontSmall, marginRight: 5}}>平台规定商家24小时内返款</Text>
                                                <Button  rounded light small onPress={()=>this.onNoticePayment()}>
                                                    <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>催返款</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row' }}>
                            <View style={{flex:1, paddingBottom:3}}>
                                <View style={{marginBottom: 3, borderColor: this.props.loadTaskObj.EvaluationImg==='' ? Color.textLight: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24, alignSelf: 'center'}}>
                                    <Text style={{alignSelf: 'center',color: this.props.loadTaskObj.EvaluationImg==='' ? Color.textLight: '#73cd6c'}}>4</Text>
                                </View>
                                {this.props.loadTaskObj.EvaluationImg==='' &&
                                this.renderConnect()
                                }

                                {this.props.loadTaskObj.EvaluationImg!=='' &&
                                this.renderConnect1()
                                }
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>收货好评</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View ><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>物流签收与评价截图</Text></View>
                                    </View>
                                </View>
                                {this.state.bShowEvaluation && (
                                    <View style={{paddingVertical: 20}}>
                                        <View>
                                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                            <View style={{flex:1,marginRight: 6}}>
                                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(1)}>
                                                    { this.state.EvaluationImg  === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.EvaluationImg } />
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flex:1, marginRight:3}}>
                                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                                    { this.state.EvaluationImg1  === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.EvaluationImg1 } />
                                                    }
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{flex:1, marginRight:3}}>
                                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                                    { this.state.EvaluationImg2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.EvaluationImg2 } />
                                                    }
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{flex:1, marginRight:3}}>
                                            </View>
                                        </View>
                                        </View>
                                        <View style={{marginVertical: 10}}>
                                            <Button small block style={styles.buttonStyle} onPress={()=>this.onSubmitEvaluation()} >
                                                <Text style={{fontSize: Styles.fontNormal}}>评估提交</Text>
                                            </Button>
                                        </View>
                                    </View>
                                )}
                                {this.props.loadTaskObj.EvaluationImg==='' && (
                                    <View style={{flex:1, paddingTop: 5}}>
                                        <View style={{...Styles.RowCenterLeft}}>
                                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                                <Text style={{color: Color.textLight, fontSize:Styles.fontSmall, marginRight: 5}}>普通好评任务</Text>
                                                <Button  rounded light small onPress={()=>this.setState({bShowEvaluation: !this.state.bShowEvaluation})}>
                                                    <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>去收货</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <View style={{borderColor: Color.textLight, borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24,  alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: 'center', color:Color.textLight}}>5</Text>
                                </View>
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View ><Text style={{color: Color.textLight, fontSize:Styles.fontNormal}}>任务完成</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View ><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>获得佣金</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

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
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: Color.LightBlue, paddingVertical: 6
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskObj,taskObjMsg,taskObjStatus ,acceptTaskObj,loadTaskObj, loadTaskStatus, loadTaskMsg,
        remindingRefundsObj,remindingRefundsStatus,remindingRefundsMsg,
        complateTaskObj,complateTaskMsg,complateTaskStatus
    } = state.taskReducer;
    return {user,taskObj,taskObjMsg,taskObjStatus, acceptTaskObj,loadTaskObj, loadTaskStatus, loadTaskMsg,
        remindingRefundsObj,remindingRefundsStatus,remindingRefundsMsg,
        complateTaskObj,complateTaskMsg,complateTaskStatus
    };
};

export default connect(mapStateToProps, {initializeStatus, completeTask,getMemberTaskAccept, loadOperationTask, remindingrefunds})(AcceptedAdvancedTask);

