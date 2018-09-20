/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import axios from 'axios';
import {View,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {submitIdCardInfo, get_idcardInfo} from './../../../actions'

import { Button, Card, Container, Content, Form, Input, Item, Text, Toast } from 'native-base';
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from 'rn-fetch-blob'


class VerifyPassport extends Component {

    constructor(props){
        super(props);

        if(props.user && this.props.user.id_card.length===0) {
            (async () => {
                const {UserId, Token} = this.props.user;
                await this.props.get_idcardInfo(UserId, Token);
            })();
        }

        this.state = {
            user: this.props.user,
            id_card_front_photo: null,
            id_card_back_photo: null,
            id_card_hand_held1: null,
            id_card_hand_held2: null,
            username: props.user.id_card ? props.user.id_card.UserRName:'',
            id_card: props.user.id_card ? props.user.id_card.Idcard:''
        };

        if(this.props.user.id_card) {
            const {IdcardInHand,IdcardNegative,IdcardPositive} = this.props.user.id_card;

            let photos = [IdcardInHand, IdcardNegative, IdcardPositive];

            photos.map((photo, index)=> {
                if(photo){
                    RNFetchBlob.fetch('GET', photo)
                        .then((res) => {
                            let status = res.info().status;

                            if(status == 200) {
                                // the conversion is done in native code
                                let base64Str = res.base64();

                                let type = res.respInfo.headers['Content-Type'];

                                let source = { uri: `data:${type};base64,` + base64Str};
                                console.log('index=',index, source);

                                if(index===0) this.setState({id_card_hand_held1: source});
                                if(index===1) this.setState({id_card_back_photo: source});
                                if(index===2) this.setState({id_card_front_photo: source});

                            } else {
                                // handle other status codes
                            }
                        })
                        // Something went wrong:
                        .catch((errorMessage, statusCode) => {
                            // error handling
                        })
                }
            });
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

        this.props.submitIdCardInfo(UserId, Token, username, id_card, id_card_front_photo?id_card_front_photo.uri:null,
            id_card_back_photo? id_card_back_photo.uri:null, id_card_hand_held1?id_card_hand_held1.uri:null);
    };

    render() {
        const {Idcard,IdcardInHand,IdcardNegative,IdcardPositive,IsAUT,IsAUTStr,UserRName} = this.props.user.id_card;
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content >
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入您的真实姓名"
                                value = {this.state.username}
                                onChangeText={(value)=>this.setState({username: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入您的身份证号码"
                                value = {this.state.id_card}
                                onChangeText={(value)=>this.setState({id_card: value})}
                            />
                        </Item>
                        <View style={{...Styles.cardStyleColumn1, flex:1}}>
                            <Text style={{color:Color.redColor}}>请上传身份证(头像面) 截图</Text>

                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(0)}>
                                        { this.state.id_card_front_photo === null && IdcardPositive ==='' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_front_photo?this.state.id_card_front_photo: {uri: IdcardPositive}} />
                                        }

                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(1)}>
                                        { this.state.id_card_back_photo === null && IdcardNegative==='' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_back_photo? this.state.id_card_back_photo: {uri: IdcardNegative}} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginLeft: 3, marginRight:3}}>
                                </View>
                                <View style={{flex:1, marginLeft: 3}}>
                                </View>
                            </View>

                            <View style={{flex:1, ...Styles.RowCenter}}>
                                <View style={{flex: 1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>身份证正面照</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>身份证背面照</Text>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                            </View>

                            <Text style={{color:Color.redColor, marginTop: 35}}>请根据示例截图上传手持身份证</Text>

                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                        { this.state.id_card_hand_held1 === null && IdcardInHand==='' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held1?this.state.id_card_hand_held1:{uri: IdcardInHand}} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} >
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={Images.sample_card} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginLeft: 3, marginRight:3}}>
                                </View>
                                <View style={{flex:1, marginLeft: 3}}>
                                </View>
                            </View>

                            <View style={{flex:1, ...Styles.RowCenter}}>
                                <View style={{flex: 1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>手持身份证照</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>手持身份证照</Text>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                            </View>
                        </View>

                        <Button block style={styles.buttonStyle} onPress = {()=>this.submitIdCard()}>
                            <Text style={{fontSize: Styles.fontLarge}}>提交</Text>
                        </Button>
                    </Form>
                    <Card transparent >
                    </Card>
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
        borderRadius: 5, backgroundColor: 'white', marginTop: 15, height: 37, marginLeft: 15, marginRight: 15
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
    const {id_res} = state.bindInfoData;
    const {user} = state.loginForm;
    return {id_res, user};
};
export default connect(mapStateToProps, {submitIdCardInfo,get_idcardInfo})(VerifyPassport);

