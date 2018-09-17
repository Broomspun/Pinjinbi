import React, {Component} from 'react';
import {Platform, UIManager, Image, Alert, AsyncStorage} from "react-native";
import { Container, Form, Content, Button, Input, Item, Toast, Text} from 'native-base';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Spinner,Spinner1} from "@components";
import {Images} from "@common";

import {changePassword, logout} from "../../../actions";

class ChangeLoginPassword extends Component {
    state = {
        cp_old_password: '',
        cp_password: '',
        cp_confirm_password: '',
    };
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        console.log(props);
    }



    componentWillUnmount(){
        AsyncStorage.removeItem('pjinbi_auth_user');
    }

    submitChangePassword () {
        const { cp_old_password, cp_password, cp_confirm_password} = this.state;
        const {UserId, Token} =  this.props.user;

        if(cp_old_password==='') {
            Toast.show({
                text: 'Please enter old password',
                buttonText: "是",
                type: "danger",
                duration: 1000
            });
            return;
        }

        if(cp_confirm_password==='') {
            Toast.show({
                text: 'Please enter repeat-password',
                buttonText: "是",
                type: "danger",
                duration: 1000
            });
            return;
        }

        if(cp_password==='') {
            Toast.show({
                text: 'Please enter new password',
                buttonText: "是",
                type: "danger",
                duration: 1000
            });
            return;
        }


        if (cp_password !== cp_confirm_password) {
            if(cp_password==='')
                Toast.show({
                    text: 'Mismatch password!',
                    buttonText: "是",
                    type: "danger",
                    duration: 1000
                });
            return
        }

        if(cp_password!=='' && cp_confirm_password!=='') {
            if (cp_old_password !== '' && cp_password === cp_confirm_password) {
                this.props.changePassword(UserId, Token, cp_old_password, cp_password)
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bChangedPassword){
            Alert.alert(
                'Success',
                'Your password was changed, Please login again!',
                [
                    {text: 'OK', onPress: () => this.props.logout()},
                ],
                { cancelable: false }
            )
        }
    }


    renderButton() {
        if(this.props.loading) {
            return <Spinner size="large" />
        }

        return (
            <Button block style={styles.buttonStyle} onPress={()=>this.submitChangePassword()}>
                <Text style={{fontSize: 20}}>完成</Text>
            </Button>
        );
    }

    renderError() {

    }

    render() {
        return(
            <Container>
                <Content padder>
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.lockIIcon}/>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入旧密码"
                                secureTextEntry
                                value = {this.state.cp_old_password}
                                onChangeText = {value => this.setState({cp_old_password: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.lockIIcon}/>
                            <Input
                                placeholderTextColor='#ccc'
                                secureTextEntry placeholder="请输入新密码"
                                value = {this.state.cp_password}
                                onChangeText = {value => this.setState({cp_password: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.lockIIcon}/>
                            <Input
                                placeholderTextColor='#ccc'
                                secureTextEntry placeholder="请确认新密码"
                                value = {this.state.cp_confirm_password}
                                onChangeText = {value => this.setState({cp_confirm_password: value})}
                            />
                        </Item>
                        {this.renderError()}
                        { this.renderButton() }
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = {
    contentStyle: {
        backgroundColor:'#f8f8f8',
        flex:1
    },
    itemStyle: {
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {bChangedPassword} = state.userInfoReducer;
    return {user,bChangedPassword};
};
export default connect(mapStateToProps, {changePassword, logout})(ChangeLoginPassword);

