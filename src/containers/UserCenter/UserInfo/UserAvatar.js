/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {submitAvatar, changedAvatar} from './../../../actions'

import { Button, Card, Container, Content, Form, Text, Toast } from 'native-base';
import ImagePicker from "react-native-image-picker";

class UserAvatar extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            userAvatar:{uri: 'http://pjbapi.wtvxin.com'+ this.props.user.Avatar}
        };

        console.log(this.state);
        console.log(this.props);
    }

    _renderAvatar = () => {
        const {userAvatar, user} = this.props;
        if(userAvatar==null && user.Avatar==='') {
            return (
                <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text>
            )
        }

        if(this.state.userAvatar){
            return (
                <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.userAvatar} />
            )
        }

        if (userAvatar) {
            return (
                <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={{uri: userAvatar}} />
            )
        }

        if (userAvatar==null && user.Avatar!=='') {
            return (
                <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={{uri: 'http://pjbapi.wtvxin.com'+user.Avatar}} />
            )
        }

    };

    selectPhotoTapped() {
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
                let source = { uri: `data:${response.type};base64,` + response.data };

                this.setState({
                    userAvatar: source,
                });

                // this.props.changedAvatar(`data:${response.type};base64,` + response.data);
            }
        });
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    componentWillUpdate(){
    }

    submitAvatar = () => {
        const {UserId, Token} = this.state.user;
        const {userAvatar} = this.state;

        if(userAvatar==='') {
            Toast.show({
                text: `Please Choose an Avartar`, buttonText: "是", type: "danger"
            });
            return;
        }

        this.props.submitAvatar(UserId, Token, userAvatar.uri);
    };

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content >
                    <Form>
                        <View style={{...Styles.cardStyleColumn1, flex:1}}>
                            <Text style={{color:Color.redColor}}>请上传身份证(头像面) 截图</Text>

                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped()}>
                                        {/*{ this.state.userAvatar === '' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :*/}
                                            {/*<Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.userAvatar} />*/}
                                        {/*}*/}
                                        {this._renderAvatar()}

                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginLeft: 3, marginRight:3}}><Text/></View>
                                <View style={{flex:1, marginLeft: 3, marginRight:3}}><Text/></View>
                                <View style={{flex:1, marginLeft: 3}}><Text/></View>
                            </View>
                        </View>

                        <Button block style={styles.buttonStyle} onPress = {()=>this.submitAvatar()}>
                            <Text style={{fontSize: Styles.fontLarge}}>登录</Text>
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
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37, marginLeft: 15, marginRight: 15
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
    const {userAvatar} = state.userInfoReducer;
    return {user,userAvatar};
};
export default connect(mapStateToProps, {submitAvatar, changedAvatar})(UserAvatar);

