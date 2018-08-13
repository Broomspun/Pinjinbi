/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {loginParameterUpdated, loginUser} from './../../actions'
import {View} from 'react-native';
import {
    Container, Content, Item, Input, Form, Icon,
    Button, Text, CheckBox, ListItem, Body, Card, CardItem
} from 'native-base';


class Login extends Component {
    onButtonPress() {
        const {phone, password} = this.props;
        this.props.loginUser({phone, password});
    }
    renderError() {
        if(this.props.error) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                </View>
            )
        }
    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner size="large" />
        }

        return (
            <Button block style={styles.buttonStyle} onPress = {this.onButtonPress.bind(this)}>
                <Text style={{fontSize: 20}}>登录</Text>
            </Button>
        );
    }


    render() {
        return (
            <Container>
                <Content padder style={{backgroundColor:'#f8f8f8'}}>
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
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {phone, password, remember, loading, error} = state.loginForm;
    return {phone, password, remember, loading, error};
};
export default connect(mapStateToProps, {loginParameterUpdated, loginUser})(Login);
