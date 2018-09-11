/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';

import {Button, Card, Container, Content, Form, Icon, Input, Item, Text, Toast} from 'native-base';
import ImagePicker from "react-native-image-picker";
import {Actions} from "react-native-router-flux";


class BindPinDuoDuoAccount extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            id_card_front_photo: null,
            id_card_back_photo: null,
            id_card_hand_held1: null,
            id_card_hand_held2: null,
            username: props.user.id_card.UserRName || 'none',
            id_card: props.user.id_card.Idcard || 'none',
            tdd_username: '',
            tdd_full_address: '',
            tdd_recipient: '',
            age: '',
            order_no: '',
        };
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
                    case 0:
                        this.setState({
                            id_card_front_photo: source
                        });
                        break;
                    case 1:
                        this.setState({
                            id_card_back_photo: source
                        });
                        break;
                    case 2:
                        this.setState({
                            id_card_hand_held1: source
                        });
                        break;
                    case 3:
                        this.setState({
                            id_card_hand_held2: source
                        });
                        break;
                }

            }
        });
    }

    componentWillReceiveProps(nextProps){

    }

    componentWillUpdate(){
    }

    submitIdCard = () => {
        const {UserId, Token} = this.state.user;
        const {username,id_card, id_card_front_photo,id_card_back_photo, id_card_hand_held1} = this.state;

        if(username==='') {
            Toast.show({
                text: `Please enter user name`, buttonText: "是", type: "danger"
            });
            return;
        }

        this.props.submitIdCardInfo(UserId, Token, username, id_card, id_card_front_photo.uri, id_card_back_photo.uri, id_card_hand_held1.uri);
    };

    render() {
        const {IdcardInHand} = this.props.user.id_card;
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content style={{paddingBottom: 20}}>
                    <View style={{padding: 15, marginBottom: 20}}>
                        <View style={{marginBottom: 15}}>
                            <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal}}>注意事项</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft, flexWrap: 'wrap' }}>
                            <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>账号审核时间
                                <Text style={{flexWrap: 'wrap', color: Color.redColor}}>（周一至周五09:00-18:00）</Text>
                                <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>，账号提交后一工作日内完成审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待，新手务必查看</Text>
                                <Text style={{flexWrap: 'wrap', color: Color.redColor}}>截图示例！</Text>
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal, paddingHorizontal: 15}}>账号信息</Text>
                    </View>
                    <View style={{...Styles.shadowStyle, paddingHorizontal: 15, backgroundColor: 'white'}}>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入京东用户名"
                                value = {this.state.jd_username}
                                onChangeText={(value)=>this.setState({tdd_username: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="收货人姓名"
                                value = {this.state.jd_recipient}
                                onChangeText={(value)=>this.setState({tdd_recipient: value})}
                            />
                        </Item>
                        <TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center',paddingVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textLight}}>请输入详细地址</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>广东深圳宝安区</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入详细地址"
                                value = {this.state.tdd_full_address}
                                onChangeText={(value)=>this.setState({jd_recipient: value})}
                            />
                        </Item>
                    </View>
                    <View style={{...Styles.shadowStyle, paddingHorizontal: 15, backgroundColor: 'white', paddingVertical: 15, ...Styles.shadowStyle}}>
                        <Text style={{color:Color.textNormal, marginTop: 25}}>账号属性（与实名认证的身份证信息一致）</Text>

                        <TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textNormal}}>请选择性别</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>男</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入你的年龄"
                                value = {this.state.age}
                                onChangeText={(value)=>this.setState({age: value})}
                            />
                        </Item>
                        <TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textNormal}}>请选择等级</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>2星</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingHorizontal: 15, marginTop: 15, paddingVertical: 20, backgroundColor: 'white', ...Styles.shadowStyle}}>
                        <View style={{...Styles.RowCenterBetween}}>
                            <Text style={{fontSize: Styles.fontSmall}}>
                                点击上传图片（上传后，长按看大图，点击可更换图片）
                                <Text style={{color: Color.redColor, marginLeft: 20}}>截图示列</Text>
                            </Text>

                        </View>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex:1,marginRight: 6}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                    { this.state.id_card_hand_held1 === null && IdcardInHand==='' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held1?this.state.id_card_hand_held1:{uri: IdcardInHand}} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>账户截图</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>订单验证截图</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>

                            </View>
                            <View style={{flex:1, marginRight:3}}>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{marginTop: 25, fontSize: Styles.fontSmall, color: Color.redColor}}>花呗：选填，开通花呗账号接单可获得更多佣金</Text>
                    </View>

                    <View style={{paddingBottom: 15}}>
                    <Button block style={styles.buttonStyle} onPress = {()=>this.submitIdCard()}>
                        <Text style={{fontSize: Styles.fontLarge}}>提交审核</Text>
                    </Button>
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
        marginTop: 10, borderRadius: 5, backgroundColor: Color.LightBlue, marginHorizontal: 15
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    return {user};
};
export default connect(mapStateToProps, {})(BindPinDuoDuoAccount);

