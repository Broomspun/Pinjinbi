import React, {Component} from 'react';
import {Platform, UIManager, View, Image, PixelRatio} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, Text} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {getMemberTaskAccept, initializeStatus, loadOperationTask} from "../../actions";

import {
    INITIALIZE_TASK_LIST_STATUS
} from "../../actions/types";

import {Actions} from "react-native-router-flux";

class AcceptedAdvancedTask extends Component {
    state = {isVisibleTaskContentModal: false};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        console.log('cccc',props);

        if(this.props.user && (this.props.taskObj ||  this.props.loadTaskObj || props.TaskAcceptNo)) {
            const {taskObj} = this.props;
            const {UserId, Token}  = this.props.user;

            if(props.task_step===1)
                this.props.loadOperationTask(UserId, Token, taskObj.TaskAcceptNo);
            // this.props.getMemberTaskAccept(UserId, Token,taskObj.TaskAcceptNo);
            else
                this.props.loadOperationTask(UserId, Token, this.props.TaskAcceptNo);
        }
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        console.log('Accepted Advanced', nextProps);
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
    }

    renderConnect() {
        return (<View style={{flex:1, height: null, width: 2,alignSelf:'center', borderLeftWidth:4/PixelRatio.get(), borderColor: Color.textNormal}}></View>);
    }
    renderConnect1() {
        return (<View style={{flex:1, height: null, width: 2,alignSelf:'center', borderLeftWidth:4/PixelRatio.get(), borderColor: '#73cd6c'}}></View>);
    }

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
        console.log(imgs);

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
                                            {imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    {imgs.SearchPageImg && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.SearchPageImg}} />
                                                    )}
                                                    {imgs.OtherShopProBottomImgA && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.OtherShopProBottomImgA}} />
                                                    )}
                                                    {imgs.OtherShopProBottomImgB && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.OtherShopProBottomImgB}} />
                                                    )}
                                                </View>
                                            )}
                                            {!imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                    <Image style={{width: 30, height: 30, }} source={Images.placeholder} />
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>浏览店铺</Text></View>
                                        <View style={{flex:7}}>
                                            {imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    {imgs.TargetProductTopImg && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.TargetProductTopImg}} />
                                                    )}
                                                    {imgs.TargetProductBottomImg && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.TargetProductBottomImg}} />
                                                    )}
                                                    {imgs.ShopProductBottomImgA && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.ShopProductBottomImgA}} />
                                                    )}
                                                    {imgs.ShopProductBottomImgB && (
                                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={{uri: imgs.ShopProductBottomImgB}} />
                                                    )}
                                                </View>
                                            )}
                                            {!imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                    <Image style={{width: 30, height: 30, marginRight: 10 }} source={Images.placeholder} />
                                                    <Image style={{width: 30, height: 30, }} source={Images.placeholder} />
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>收藏店铺</Text></View>
                                        <View style={{flex:7}}>
                                            {imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    {imgs.ShopCollectionImg && (
                                                        <Image style={{width: 30, height: 30}} source={{uri: imgs.ShopCollectionImg}} />
                                                    )}

                                                </View>
                                            )}
                                            {!imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>加入购物车</Text></View>
                                        <View style={{flex:7}}>
                                            {imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    {imgs.ShoppingCartImg && (
                                                        <Image style={{width: 30, height: 30}} source={{uri: imgs.ShoppingCartImg}} />
                                                    )}

                                                </View>
                                            )}
                                            {!imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                </View>
                                            )}

                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:3}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>加入购物车</Text></View>
                                        <View style={{flex:7}}>
                                            {imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    {imgs.MerchantChatImg && (
                                                        <Image style={{width: 30, height: 30}} source={{uri: imgs.MerchantChatImg}} />
                                                    )}
                                                    {imgs.OrderDetailsImg && (
                                                        <Image style={{width: 30, height: 30}} source={{uri: imgs.OrderDetailsImg}} />
                                                    )}

                                                </View>
                                            )}
                                            {!imgs && (
                                                <View style={{...Styles.RowCenterRight, padding: 5}}>
                                                    <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.placeholder} />
                                                    <Image style={{width: 30, height: 30}} source={Images.placeholder} />
                                                </View>
                                            )}

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
                                <View style={{marginBottom:3, borderColor: !imgs ? Color.textLight: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24,  alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: 'center', color:!imgs ? Color.textLight: '#73cd6c'}}>3</Text>
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
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row' }}>
                            <View style={{flex:1, paddingBottom:3}}>
                                <View style={{marginBottom: 3, borderColor: !imgs ? Color.textLight: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24, alignSelf: 'center'}}>
                                    <Text style={{alignSelf: 'center',color:!imgs ? Color.textLight: '#73cd6c'}}>4</Text>
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
                                        <View><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>收货好评</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View ><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}> 物流签收与评价截图</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:1, ...Styles.RowCenterRight}}>
                                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall, marginRight: 5}}>普通好评任务</Text>
                                            <Button  rounded light small >
                                                <Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>去收货</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </View>
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

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskObj,taskObjMsg,taskObjStatus ,acceptTaskObj,loadTaskObj, loadTaskStatus, loadTaskMsg} = state.taskReducer;
    return {user,taskObj,taskObjMsg,taskObjStatus, acceptTaskObj,loadTaskObj, loadTaskStatus, loadTaskMsg};
};

export default connect(mapStateToProps, {initializeStatus, getMemberTaskAccept, loadOperationTask})(AcceptedAdvancedTask);

