import React, {Component} from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Platform, UIManager} from "react-native";

class ForgottenPassword extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        console.log(props);
    }
    render() {
        return(
            <Container>
                <Content>
                    <Form>
                        <Item regular underline={false} style={{borderRadius: 5, backgroundColor: 'white'}}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入手机号码"
                                value = {this.props.phone}
                                onChangeText = {value => this.props.loginParameterUpdated({prop: 'phone', value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} name='lock' />
                            <Input
                                placeholderTextColor='#ccc'
                                secureTextEntry placeholder="请输入密码"
                                value = {this.props.password}
                                onChangeText = {value => this.props.loginParameterUpdated({prop: 'password', value})}
                            />
                        </Item>
                        <ListItem style={{marginLeft:10}}>
                            <CheckBox
                                checked={this.props.remember}
                                color="black"
                                onPress = {value => this.props.loginParameterUpdated({prop: 'remember', value})}
                            />
                            <Body>
                            <Text>记住密码</Text>
                            </Body>
                        </ListItem>
                        {this.renderError()}
                        { this.renderButton() }
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default ForgottenPassword;
