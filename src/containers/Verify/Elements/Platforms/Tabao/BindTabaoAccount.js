/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity,StyleSheet, PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';

import {Button, Card, Container, Content, Form, Icon, Input, Item, Text, Toast} from 'native-base';
import ImagePicker from "react-native-image-picker";
import {Actions} from "react-native-router-flux";
import RNPickerSelect from 'react-native-picker-select';
import {getAreaLists} from "@actions";


class BindTabaoAccount extends Component {

    constructor(props){
        super(props);

        this.setProvinceCode = this.setProvinceCode.bind(this);

        this.state = {
            user: this.props.user,
            id_card_front_photo: null,
            id_card_back_photo: null,
            id_card_hand_held1: null,
            id_card_hand_held2: null,
            username: props.user.id_card.UserRName || 'none',
            id_card: props.user.id_card.Idcard || 'none',
            best_game: '',
            tabao_name: '',
            contact_phone: '',
            age: undefined,
            OrderNo: '123143245253646',
            Gender: undefined,
            ProvinceCode: undefined,
            CityCode: undefined,
            DistrictCode: undefined,
            TaobaoValue: '1000',
            CreditRating: '2',
            genders:[
                {
                    label:'性别: 男',
                    value: '男'
                },
                {
                    label:'性别: 女',
                    value: '女'
                }
            ]
        };
    }

    componentDidMount(){
        this.props.getAreaLists('Province');
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
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

    setProvinceCode = (value)=>{
        this.setState({
            ProvinceCode: value,
        });

        this.props.getAreaLists('City', value);

    };

    setCityCode = (value) => {
        this.setState({
            CityCode: value,
        });

        this.props.getAreaLists('District', value);
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
                                placeholder="最爱打法"
                                value = {this.state.best_game}
                                onChangeText={(value)=>this.setState({best_game: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="收货人姓名"
                                value = {this.state.tabao_name}
                                onChangeText={(value)=>this.setState({tabao_name: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="联系电话"
                                value = {this.state.contact_phone}
                                onChangeText={(value)=>this.setState({contact_phone: value})}
                            />
                        </Item>
                        {/*<TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center',paddingVertical: 10, ...Styles.bottomBorderStyle}}>*/}
                            {/*<View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>*/}
                                {/*<Text style={{color: Color.textLight}}>请选择城市</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flex:1,}}>*/}
                                {/*<View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>*/}
                                    {/*<Text style={{color: Color.textNormal}}>广东深圳宝安区</Text>*/}
                                    {/*<Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        {this.props.provinces && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '选择省份',
                                    value: null,
                                }}
                                items={this.props.provinces}
                                onValueChange={(value) => { this.setProvinceCode(value)}}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.ProvinceCode}
                            />
                        )}
                        {this.props.cities && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '请选择城市',
                                    value: null,
                                }}
                                items={this.props.cities}
                                onValueChange={(value) => { this.setCityCode(value)}}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.CityCode}
                            />
                        )}
                        {this.props.districts && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '请选择区',
                                    value: null,
                                }}
                                items={this.props.districts}
                                onValueChange={(value) => {
                                    this.setState({DistrictCode: value})
                                }}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.DistrictCode}
                            />
                        )}

                    </View>
                    <View style={{...Styles.shadowStyle, paddingHorizontal: 15, backgroundColor: 'white', paddingVertical: 15, ...Styles.shadowStyle}}>
                        <Text style={{color:Color.textNormal, marginTop: 25}}>账号属性（与实名认证的身份证信息一致）</Text>

                        {/*<TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>*/}
                        {/*<View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>*/}
                        {/*<Text style={{color: Color.textNormal}}>性别</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{flex:1,}}>*/}
                        {/*<View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>*/}
                        {/*<Text style={{color: Color.textNormal}}>男</Text>*/}
                        {/*<Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>*/}
                        {/*</View>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        <RNPickerSelect
                            placeholder={{
                                label: '请选择性别',
                                value: null,
                            }}
                            items={this.state.genders}
                            onValueChange={(value) => {
                                this.setState({
                                    Gender: value,
                                });
                            }}
                            style={{ ...pickerSelectStyles }}
                            mode='dropdown'
                            value={this.state.Gender}
                        />
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="年龄"
                                value = {this.state.age}
                                onChangeText={(value)=>this.setState({age: value})}
                            />
                        </Item>
                        <TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textNormal}}>信誉</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>{this.state.CreditRating}星</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textNormal}}>淘气值</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>{this.state.TaobaoValue}以下</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="订单编号"
                                value = {this.state.OrderNo}
                                onChangeText={(value)=>this.setState({OrderNo: value})}
                            />
                        </Item>
                        <View style={{...Styles.RowCenterLeft, paddingVertical: 10, marginTop: 10}}>
                            <TouchableOpacity>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>购物类目</Text>
                            </TouchableOpacity>
                        </View>
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
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: Styles.fontNormal,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1/PixelRatio.get(),
        borderColor: Color.Border,
        borderRadius: 4,
        backgroundColor: 'white',
        color: Color.textNormal,
    },
});
const mapStateToProps = (state) => {
    const {user, provinces, cities, districts} = state.loginForm;
    return {user, provinces, cities, districts};
};
export default connect(mapStateToProps, {getAreaLists})(BindTabaoAccount);

