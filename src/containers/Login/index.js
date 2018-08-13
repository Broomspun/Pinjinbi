/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'


import {
    Container, Content, Item, Input, Form, Label, Icon,
    Button, Text, CheckBox, ListItem, Body, Card, CardItem, Header, Footer,Left, Title, Right, FooterTab
} from 'native-base';


class Login extends Component {

    render() {
        return (
            <Container>
                <Content padder style={{backgroundColor:'#f8f8f8'}}>
                    <Form>
                        <Item regular underline={false} style={{borderRadius: 5, backgroundColor: 'white'}}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input placeholderTextColor='#ccc' placeholder="请输入手机号码" />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} name='lock' />
                            <Input placeholderTextColor='#ccc' secureTextEntry placeholder="请输入密码" />
                        </Item>
                        <ListItem style={{marginLeft:10}}>
                            <CheckBox  checked={true} color="black" />
                            <Body>
                                <Text>记住密码</Text>
                            </Body>
                        </ListItem>
                        <Button block style={styles.buttonStyle}>
                            <Text style={{fontSize: 20}}>登录</Text>
                        </Button>
                    </Form>
                    <Card transparent >
                        <CardItem style={{backgroundColor: '#f8f8f8'}}>
                            <Body style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                            <Button transparent >
                                <Text style={{color: '#000', fontSize: 18}}>忘记密码</Text>
                            </Button>
                            <Text style={{marginTop: 10, color: '#000', fontSize: 18}}>还没有账号</Text>
                            <Button transparent>
                                <Text style={{ color: 'red', fontSize: 18}}>立即注册</Text>
                            </Button>
                            </Body>
                        </CardItem>
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
        borderRadius: 5, backgroundColor: 'white', marginTop: 10
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0'
    }
} ;
export default Login;
