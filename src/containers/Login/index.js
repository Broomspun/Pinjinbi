/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import Timer from 'react-timer-mixin';
import {View, Image, Platform, UIManager, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants, Styles, Color} from '@common';
import {Actions} from 'react-native-router-flux';
import {loginParameterUpdated, loginUser, initializeLoginStatus, loadFromStorage} from './../../actions';
import {
    Body,
    Button,
    Card,
    CardItem,
    CheckBox,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    ListItem,
    Text,
    Toast
} from 'native-base';


class Login extends Component {
    constructor(props) {

        console.log('test');
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {remember: true}
    }


    onButtonPress() {
        const {phone, password} = this.props;
        this.props.loginUser({phone, password});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user && this.state.remember){
            AsyncStorage.setItem('pjinbi_auth_user_phone', this.props.phone);
            AsyncStorage.setItem('pjinbi_auth_user_password', this.props.password);
        }else if(nextProps.user && !this.state.remember){
            AsyncStorage.removeItem('pjinbi_auth_user_phone');
            AsyncStorage.removeItem('pjinbi_auth_user_password');
        }

        if(nextProps.user && nextProps.bLoginSuccess!==null) {
            if (nextProps.bLoginSuccess) {
                Toast.show({
                    text: `${nextProps.loginMessage}`,
                    buttonText: "是",
                    type: "success",
                });
                this.props.initializeLoginStatus();
                Timer.setTimeout(() => {

                    Actions.main();
                }, 500);
            }
        }
        else if(nextProps.bLoginSuccess===false && nextProps.error!=='') {
            Toast.show({
                text: `${nextProps.error}`,
                buttonText: "是",
                type: "danger",
                duration: 1000
            });
            this.props.initializeLoginStatus();
        }

        if(!nextProps.bType && nextProps.user===null) {
            (async () => {
                let phone = await AsyncStorage.getItem('pjinbi_auth_user_phone');
                let password = await AsyncStorage.getItem('pjinbi_auth_user_password');
                this.props.loadFromStorage(phone, password);

            })();
        }
    }

    componentWillUnmount() {
        console.log('login unmount');

        this.props.initializeLoginStatus();
    }

    componentDidMount(){
        (async () => {
            let phone = await AsyncStorage.getItem('pjinbi_auth_user_phone');
            let password = await AsyncStorage.getItem('pjinbi_auth_user_password');
            console.log("test user data :"+JSON.stringify(phone)+","+password);
            this.props.loadFromStorage(phone, password);

        })();

    }

    renderError() {

    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner size="large" />
        }

        return (
            <Button block style={styles.buttonStyle} /*onPress = {()=> Actions.home({phone: this.props.phone})}*/ onPress = {this.onButtonPress.bind(this)} >
                <Text style={{fontSize: Styles.fontLarge}}>登录</Text>
            </Button>
        );
    }

    render() {
        return (
            <Container>
                <Content padder style={{backgroundColor:'#f8f8f8'}}>
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入手机号码"
                                value = {this.props.phone}
                                onChangeText = {value => this.props.loginParameterUpdated({prop: 'phone', value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.lockIIcon}/>
                            <Input
                                placeholderTextColor='#ccc'
                                secureTextEntry placeholder="请输入密码"
                                value = {this.props.password}
                                onChangeText = {value => this.props.loginParameterUpdated({prop: 'password', value})}
                            />
                        </Item>
                        <ListItem style={{marginLeft:10}}>
                            <CheckBox
                                checked={this.state.remember}
                                color="black"
                                onPress = {() => this.setState({remember: !this.state.remember})}
                            />
                            <Body>
                            <Text style={{fontSize: 14}}>记住密码</Text>
                            </Body>
                        </ListItem>
                        {this.renderError()}
                        { this.renderButton() }
                    </Form>
                    <Card transparent >
                        <CardItem style={{backgroundColor: '#f8f8f8'}}>
                            <View style={{flex: 1, ...Styles.RowCenter}}>
                                <Button transparent onPress = {()=>{Actions.forgottenverify()}}>
                                    <Text style={{color: '#000', fontSize: 16}}>忘记密码</Text>
                                </Button>
                                <Text style={{ color: '#000', fontSize: 16}}>还没有账号</Text>
                                <Button transparent onPress={()=> {Actions.register()}}>
                                    <Text style={{ color: 'red', fontSize: 16}}>立即注册</Text>
                                </Button>
                            </View>
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
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: Color.LightBlue
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {bType,phone, password, loading, error, user, bLoginSuccess, loginMessage} = state.loginForm;
    return {bType, phone, password, loading, error, user, bLoginSuccess, loginMessage};
};
export default connect(mapStateToProps, {loginParameterUpdated, loginUser, initializeLoginStatus, loadFromStorage})(Login);
