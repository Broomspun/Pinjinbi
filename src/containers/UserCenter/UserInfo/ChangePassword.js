import React, {Component} from 'react';
import {Platform, UIManager, Image} from "react-native";
import { Container, Form, Content, Button, Input, Item, Icon, Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Spinner,Spinner1} from "../../components";
import {Images} from "@common";
class ChangePassword extends Component {
    state = {
        cp_phone: '',
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

    renderButton() {
        if(this.props.loading) {
            return <Spinner size="large" />
        }

        return (
            <Button block style={styles.buttonStyle}>
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
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入旧密码"
                                value = {this.state.cp_phone}
                                onChangeText = {value => this.setState({cp_phone: value})}
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
export default ChangePassword;
