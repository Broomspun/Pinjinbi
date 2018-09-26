import React, {Component} from 'react';
import {Platform, UIManager, View, Image, TouchableOpacity, PixelRatio, Alert} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, Text, Textarea, Input, Item, Form} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {loadOperationTask, initializeStatus, verifyShopName, submitTask} from "../../actions";
import ImagePicker from "react-native-image-picker";
import _ from 'lodash';

import {
    INITIALIZE_LOAD_OPERATIONAL_STATUS,
    INITIALIZE_SUBMIT_TASK_STATUS,

} from "../../actions/types";

import Modal from "react-native-modal";
import {RowLeftRightBlock} from "../../components";
import {Actions} from "react-native-router-flux";
import Timer from 'react-timer-mixin';

class LoadOperationalAdvancedTask extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        this.state = {taskType: '操作任务',
            SearchPageImg: null,
            TargetProductTopImg: null,
            TargetProductBottomImg: null,
            OtherShopProBottomImgA: null,
            OtherShopProBottomImgB: null,
            ShopProductBottomImgA: null,
            ShopProductBottomImgB: null,
            ShopCollectionImg: null,
            ShoppingCartImg: null,
            MerchantChatImg: null,
            OrderDetailsImg: null,
            isVisibleSubmitModal: false,
            PlatOrderNo: ''
        };

        if(this.props.user && (this.props.taskObj || this.props.loadTaskObj)) {
            const {taskObj} = this.props;
            const {UserId, Token}  = this.props.user;
            if(!this.props.loadTaskObj)
                this.props.loadOperationTask(UserId, Token,taskObj.TaskAcceptNo);
        }
    }

    onTouchModalCloseButton = () => {
        this.setState({isVisibleSubmitModal: false});
        this.props.initializeStatus(INITIALIZE_SUBMIT_TASK_STATUS);

        if(this.props.user && (this.props.taskObj || this.props.loadTaskObj)) {
            const {taskObj, loadTaskObj} = this.props;
            const {UserId, Token}  = this.props.user;

            if(this.props.loadTaskObj)
                this.props.loadOperationTask(UserId, Token,loadTaskObj.TaskAcceptNo);
            // this.props.getMemberTaskAccept(UserId, Token,taskObj.TaskAcceptNo);
            else
                this.props.loadOperationTask(UserId, Token,taskObj.TaskAcceptNo);
        }

        Timer.setTimeout(async () => {
            Actions.acceptedAdvancedTask({task_step: 2});
        }, 2000);
    };


    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.loadTaskStatus!==null && nextProps.loadTaskStatus===false) {
            Alert.alert(
                '失败',
                nextProps.loadTaskMsg,
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_LOAD_OPERATIONAL_STATUS)},
                ],
                {cancelable: false}
            )
        }

        if(nextProps.submitTaskStatus!==null && nextProps.submitTaskStatus){
            this.setState({isVisibleSubmitModal: true});
        }
    }


    _renderTaskSubmitModal = () => {

        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>系统提示</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.textNormal, paddingVertical: 30}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>提交任务成功</Text>
                    </View>
                    <View style={{ ...Styles.ColumnCenter, alignItems: 'center', marginTop: 30}}>
                        <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.onTouchModalCloseButton()}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };
    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_LOAD_OPERATIONAL_STATUS);
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
                    case 18:
                        this.setState({
                            SearchPageImg: source
                        });
                        break;
                    case 19:
                        this.setState({
                            OtherShopProBottomImgA: source
                        });
                        break;
                    case 20:
                        this.setState({
                            OtherShopProBottomImgB: source
                        });
                        break;
                    case 24:
                        this.setState({TargetProductTopImg: source});
                        break;
                    case 25:
                        this.setState({TargetProductBottomImg: source});
                        break;
                    case 26:
                        this.setState({ShopProductBottomImgA: source});
                        break;
                    case 27:
                        this.setState({ShopProductBottomImgB: source});
                        break;
                    case 28:
                        this.setState({ShopCollectionImg: source});
                        break;
                    case 29:
                        this.setState({ShoppingCartImg: source});
                        break;
                    case 31:
                        this.setState({MerchantChatImg: source});
                        break;
                    case 32:
                        this.setState({OrderDetailsImg: source});
                        break;

                }
            }
        });
    }

    onSubmitAdvancedTask = () => {
        if(this.props.user) {
            const {UserId, Token} = this.props.user;

            if(this.state.PlatOrderNo===''){
                Alert.alert(
                    'Warning',
                    'Please put in platform order number',
                    [
                        {text: 'OK', onPress: () => console.log('pressed')},
                    ],
                    {cancelable: false}
                );
                return;
            }
            const {
                SearchPageImg,
                TargetProductTopImg,
                TargetProductBottomImg,
                OtherShopProBottomImgA,
                OtherShopProBottomImgB,
                ShopProductBottomImgA,
                ShopProductBottomImgB,
                ShopCollectionImg,
                ShoppingCartImg,
                MerchantChatImg,
                OrderDetailsImg} = this.state;

            let aImages = [SearchPageImg ? 1 : false, TargetProductTopImg ? 1 : false,  TargetProductBottomImg ? 1 : false, OtherShopProBottomImgA ? 1 : false,
                OtherShopProBottomImgB ? 1 : false, ShopProductBottomImgA ? 1 : false, ShopProductBottomImgB ? 1 : false, ShopCollectionImg ? 1 : false, ShoppingCartImg ? 1 : false,
                MerchantChatImg ? 1 : false, OrderDetailsImg ? 1 : false];

            aImages = _.compact(aImages);


            let imgJson = {
                "SearchPageImg":  SearchPageImg ? SearchPageImg.uri: false,
                "TargetProductTopImg": TargetProductTopImg ? TargetProductTopImg.uri: false,
                "TargetProductBottomImg": TargetProductBottomImg ? TargetProductBottomImg.uri: false,
                "OtherShopProBottomImgA": OtherShopProBottomImgA ? OtherShopProBottomImgA.uri: false,
                "OtherShopProBottomImgB": OtherShopProBottomImgB ? OtherShopProBottomImgB.uri: false,
                "ShopProductBottomImgA": ShopProductBottomImgA ? ShopProductBottomImgA.uri: false,
                "ShopProductBottomImgB": ShopProductBottomImgB ? ShopProductBottomImgB.uri: false,
                "ShopCollectionImg": ShopCollectionImg ? ShopCollectionImg.uri: false,
                "ShoppingCartImg": ShoppingCartImg ? ShoppingCartImg.uri: false,
                "MerchantChatImg": MerchantChatImg ? MerchantChatImg.uri: false,
                "OrderDetailsImg": OrderDetailsImg ? OrderDetailsImg.uri: false,
            };

            imgJson = _.pickBy(imgJson, _.identity);
            console.log('images',imgJson);

            if(aImages.length<2){
                Alert.alert(
                    '失败',
                    'You at least need to choose 2 images',
                    [
                        {text: 'OK', onPress: () => console.log('pressed')},
                    ],
                    {cancelable: false}
                );
                return;
            }

            this.props.submitTask(UserId, Token,this.props.loadTaskObj.TaskAcceptNo,  JSON.stringify(imgJson), this.state.PlatOrderNo, this.props.loadTaskObj.TaskType)
        }

    };

    render() {

        if(this.props.loadTaskObj===null)
            return (<View></View>);
        const {loadTaskObj} = this.props;

        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <Modal  isVisible={this.state.isVisibleSubmitModal} style={{...Styles.ColumnCenter}}>
                        {this._renderTaskSubmitModal()}
                    </Modal>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingBottom: 10}}>
                            <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                <Image source={Images.prendig_review} style={{width: 20, height: 20, marginRight: 10}} />
                                <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>店铺名称：{loadTaskObj.ShopName}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>

                        <View style={{flex:1, paddingTop: 5, paddingBottom: 10}}>
                            <View style={{...Styles.RowCenterLeft}}>
                                <View style={{flex:1}}><Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>目标商品</Text></View>
                                <View style={{flex:1, ...Styles.RowCenterRight}}>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall, marginRight: 5}}>垫付总金额：</Text>
                                    <Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall, marginRight: 5}}>{`${loadTaskObj.Amount}元`}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1, ...Styles.RowCenterLeft, paddingVertical: 10}}>
                            <View style={{flex: 1}}>
                                <Image source={Images.product} style={{ height: 80, width: 80}}/>
                            </View>
                            <View style={{flex:3, marginLeft: 10}}>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>单件商品{`${loadTaskObj.ProductName}`}</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>单件商品支付金额：{loadTaskObj.Amount}元</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>件数: {loadTaskObj.ProductNum}件</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>下单规格尺寸：{loadTaskObj.ProductSpec}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>任务要点</Text>
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='任务类型' rightTitle={loadTaskObj.PlatType}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='评价要求' rightTitle={loadTaskObj.EvaluationTitle}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <View style={{flex:1, paddingTop: 5}}>
                                <View style={{...Styles.RowCenterLeft}}>
                                    <View style={{flex:1}}><Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>搜索关键词</Text></View>
                                    <View style={{flex:1, ...Styles.RowCenterRight}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall, marginRight: 5}}>{loadTaskObj.KeyWord}</Text>
                                        <TouchableOpacity style={{paddingHorizontal: 3, paddingVertical: 2, borderColor: Color.Border, borderWidth: 2/PixelRatio.get(), borderRadius: 2}}>
                                            <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>复制关键词</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='购买数量' rightTitle={loadTaskObj.ProductNum}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='排序方式' rightTitle={loadTaskObj.SortBy}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='付款/收货数' rightTitle={`约${loadTaskObj.PayNumber}人`}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='发货地' rightTitle={loadTaskObj.ProductAddress}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>价格区间</Text>
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>折扣和服务</Text>
                        </View>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>买家留言</Text>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>商家要求</Text>
                        </View>
                        <View style={{paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.orangeColor}}>{loadTaskObj.ShopMessage}</Text>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>注意事项</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>1、拼金币中接手任务的账号和淘宝/天猫上实际下单的账号必须一致，下单不可代付，如发现直接封号</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>2、要去至少和商家客服有4个问题互动，不得一次性复制4个问题给客服，如果客服不在线，等待时间超过10分钟，可以直接下单</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>3、严禁和卖家旺旺聊天提到刷单“微信”拼金币任务“平台”等敏感词</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>4、淘宝/天猫上实际下单的地址必须和拼金币接任务的淘宝账号绑定的地址一致，如收货信息有变请先更改信息后再解任务</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>5、拼金币所有订单不允许使用淘宝客、返利、红包、积分等优惠方式下单，出现上述情况将从本金里面扣除返利佣金，两次以上永久封号</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>6、不允许使用集分宝、淘金币、天猫积分等积分抵扣付款金额，否则将从本金中扣除购物金额的1%，手续费或积分对应的金额，拼金币的任务不不参与好评返现，如果商家在任务中有要求使用店铺优惠卷的可按照商家要求领取抵扣的优惠券，反款只饭实际支付得到金额。</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>7、一定要等到快递真实签收后才能确认收货并按任务的评价要求给予5星好评</Text>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>任务步骤</Text>
                        </View>
                        <View style={{flex:1, paddingTop: 5}}>
                            <View style={{...Styles.RowCenterLeft}}>
                                <View style={{flex:1}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>第一步  货比三家</Text></View>
                                <View style={{flex:1, ...Styles.RowCenterRight}}>
                                    <Button small light>
                                        <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>点击查看示例</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={{paddingBottom: 10, paddingTop: 20, ...Styles.borderBottomStyle}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>1、请确认使用最爱打法师账号登录淘宝应用</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>2、点击搜索框粘贴指定的关键词</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范围，对搜索结果页面截一张图</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>4、随机点开搜索列表中别家的任意2个商品，慢慢滑动浏览商品直到底部（分别浏览一分钟以上）然后分别截一张商品底部图片</Text>
                        </View>
                        <View style={{paddingVertical: 20, ...Styles.borderBottomStyle}}>
                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(18)}>
                                        { this.state.SearchPageImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.SearchPageImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>搜索结果</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(19)}>
                                        { this.state.OtherShopProBottomImgA === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.OtherShopProBottomImgA} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>其他商家A底部</Text>
                                    </View>
                                </View>

                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(20)}>
                                        { this.state.OtherShopProBottomImgB === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.OtherShopProBottomImgB} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>其他商家B底部</Text>
                                    </View>
                                </View>

                                <View style={{flex:1, marginRight:3}}>
                                </View>
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingVertical: 10}}>
                            <View style={{flex:1}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>核对店铺及商品是否正确</Text></View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Button small light >
                                    <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>点击查看示例</Text>
                                </Button>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{flex:1, ...Styles.borderBottomStyle}}><Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>商家店铺名称：可乐***店</Text></View>
                        <View style={{...Styles.RowCenterBetween, paddingVertical: 10}}>
                            <View style={{flex: 3}}>
                                <Item regular underline={false} style={{ borderRadius: 5, backgroundColor: 'white', marginTop: 5, height: 30, marginLight: 5}}>
                                    <Input
                                        placeholderTextColor='#ccc'
                                        placeholder="请在此粘贴商品链接"
                                        style={{fontSize: Styles.fontSmall}}
                                    />
                                </Item>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Button small style={{backgroundColor: Color.LightBlue}}><Text style={{color:'white'}}>核对</Text></Button>
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingVertical: 10, ...Styles.borderBottomStyle}}>
                            <View style={{flex:1}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>第二步   浏览店铺</Text></View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Button small light>
                                    <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>点击查看示例</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>1、根据商品主图、价格、名称等条件找到目标商品，从头到尾慢慢浏览，停留至少3分钟，并在页面头部和底部分别截图</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>2、点击“进入店铺”按钮随机点开店铺里任意2个商品，分别慢慢滑动浏览商品详情值到底部（分别浏览一分钟以上）分别截图一张商品底部图片</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>3、如有带附加商品，上一步中随机点的2个商品换成任务要求的附加商品，分别慢慢滑动浏览商品详情直到底部（分别浏览一分钟以上）分别截图一张商品底部图片，按照图片下面的文字来上传相应的图片</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>4、返回目标商品按任务要求下单</Text>
                        </View>

                        <View style={{paddingVertical: 20}}>
                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(24)}>
                                        { this.state.TargetProductTopImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.TargetProductTopImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>目标商品顶部</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(25)}>
                                        { this.state.TargetProductBottomImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.TargetProductBottomImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>目标商品底部</Text>
                                    </View>
                                </View>

                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(26)}>
                                        { this.state.ShopProductBottomImgA === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.ShopProductBottomImgA} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>店内商家A底部</Text>
                                    </View>
                                </View>

                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(27)}>
                                        { this.state.ShopProductBottomImgB === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.ShopProductBottomImgB} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>店内商家B底部</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{paddingBottom: 10}}>
                                <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>5、收藏店铺</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(28)}>
                                        { this.state.ShopCollectionImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.ShopCollectionImg} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginRight:3}}></View>
                                <View style={{flex:1, marginRight:3}}></View>
                                <View style={{flex:1, marginRight:3}}></View>
                            </View>
                            <View style={{paddingBottom: 10}}>
                                <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>6、加入购物车</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(29)}>
                                        { this.state.ShoppingCartImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.ShoppingCartImg} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginRight:3}}></View>
                                <View style={{flex:1, marginRight:3}}></View>
                                <View style={{flex:1, marginRight:3}}></View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.RowCenterLeft, paddingVertical: 10, ...Styles.borderBottomStyle}}>
                            <View style={{flex:1}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>第三步   聊天下单支付</Text></View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Button small light>
                                    <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>点击查看示例</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{paddingBottom: 10}}>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>1、点击“联系客服”按钮，和商家客服聊天至少进行4个问题以上的互动，完成或截图一张</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>2、把商品加入购物车，确认件数，颜色尺码，如需留言按要求留言，下单付款</Text>
                            <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>3.付款完成后，点击进入订单详情页面，截图一张</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(31)}>
                                    { this.state.MerchantChatImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.MerchantChatImg} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>商家聊天截图</Text>
                                </View>
                            </View>
                            <View style={{flex:1,marginRight: 6}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(32)}>
                                    { this.state.OrderDetailsImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.OrderDetailsImg} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontTiny, color: Color.textNormal}}>订单详情截图</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}></View>
                            <View style={{flex:1, marginRight:3}}></View>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.RowCenterLeft, paddingVertical: 10, ...Styles.borderBottomStyle}}>
                            <View style={{flex:1}}><Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>第四步 写实付金额</Text></View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Button small light>
                                    <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>点击查看示例</Text>
                                </Button>
                            </View>
                        </View>
                        <View>
                            <View style={{...Styles.RowCenterLeft}}>
                                <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>应垫付金额产考：</Text>
                                <Text style={{fontSize: Styles.fontSmall, color: Color.orangeColor, marginLeft: 5}}>{loadTaskObj.Amount}元</Text>
                                <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal,marginLeft: 5}}>请按实际垫付金额填写）</Text>
                            </View>
                        </View>
                        <View>
                            <Text  style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>订单编号课在淘宝订单详情中复制</Text>
                        </View>
                        <Form>
                            <Item regular underline={false} style={{borderRadius: 5, backgroundColor: 'white', marginTop: 5, height: 32}}>
                                <Input
                                    placeholderTextColor='#ccc'
                                    placeholder="请输入实际付款金额"
                                    style={{fontSize: Styles.fontSmall}}
                                />
                            </Item>
                            <Item regular style={{borderRadius: 5, backgroundColor: 'white', marginTop: 5, height: 32}}>
                                <Input
                                    placeholderTextColor='#ccc'
                                    placeholder="请粘贴订单编号"
                                    style={{fontSize: Styles.fontSmall}}
                                    value={this.state.PlatOrderNo}
                                    onChangeText={(value)=>this.setState({PlatOrderNo: value})}
                                />
                            </Item>
                            <View>
                                <Button small block style={styles.buttonStyle} onPress={()=>this.onSubmitAdvancedTask()} >
                                    <Text style={{fontSize: Styles.fontNormal}}>提交审核</Text>
                                </Button>
                            </View>
                        </Form>
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
    const {taskObj,taskObjMsg,taskObjStatus,loadTaskObj, loadTaskStatus, loadTaskMsg,
        submitTaskMsg,submitTaskStatus,
    } = state.taskReducer;
    return {user,taskObj,taskObjMsg,taskObjStatus, loadTaskObj, loadTaskStatus, loadTaskMsg, submitTaskMsg,submitTaskStatus};
};

export default connect(mapStateToProps, {initializeStatus, loadOperationTask, verifyShopName, submitTask})(LoadOperationalAdvancedTask);

