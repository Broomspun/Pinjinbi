import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager, Text, PixelRatio, View, Image} from 'react-native'

import { Container, Content, Button, Accordion, Header, Item, Icon, Input} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'
import {getHelpDetail} from "../../actions";
import {Spinner1} from "../../components";

const faq_dataArray = [
    { title: "1、IOS（苹果手机）无法注册显示参数缺失", content: "7.0以下IOS系统不支持注册，更新过IOS10的，如果吧拼金币卸载以后再安装不能进入的，去设置-通用-设备管理-把拼金币添加信任，就可以了。" },
    { title: "2、安卓手机显示参数缺失或未注册显示被其他号码注册", content: "安装用户注册显示参数缺失问题，是手机设置吗（IMEL）无法获取可做一下设置\n" +
            "1、如果是双卡手机，请切换主卡，重启后再尝试登陆拼金币\n" +
            "2、在手机拨号界面输入*#06#检查IMEL码是否存在，若不\n" +
            "存在，无法注册拼金币，若存在请按下步骤（2选1即可）设\n" +
            "置读取设备码\n" +
            "a、安装手机360安全卫士：安全防护-隐私行为监控-软件隐\n" +
            "私权限管理-找到拼金币-选择允许获取设置信息\n" +
            "b、安装腾讯安全管家：软件权限管理-软件管理-找到拼金币\n" +
            "-选择允许获取手机识别码\n" +
            "3、刷机过的也可尝试卸载重装拼金币并重启手机" },
    { title: "3、一个手机可以注册几个拼金币", content: "Lorem ipsum dolor sit amet" },
    { title: "4、怎么注册，收费吗？", content: "Lorem ipsum dolor sit amet" },
    { title: "5、账号不用了可以注销吗？", content: "Lorem ipsum dolor sit amet" }
];

class Faqs extends Component {

    componentWillMount(){
    }

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.props.getHelpDetail(this.props.helpId);
    }

    _renderHelpDetail = () => {
        if(this.props.helpDetail && this.props.helpDetail.length>0){
            let faqs = this.props.helpDetail.map((detail, index)=>{
                return {content: detail.ContentText.replace(/\r/gm, "\n"), title: detail.TitleText}
            });
            return (
                <Accordion
                    headerStyle={{backgroundColor: Color.mainBackground}}
                    contentStyle={{backgroundColor: 'white', fontSize: Styles.fontSmall, color: Color.textNormal}}
                    dataArray={faqs} expanded={0}/>
            )
        }
        else if(this.props.helpDetail && this.props.helpDetail.length===0)
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height - 250}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.empty_messages_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时消息哦！</Text>
                    </View>
                </View>
            );

    };
    render() {
        return(
            <Container style={{backgroundColor: Color.mainBackground, marginTop: 10, marginBottom: 10}}>
                <Header searchBar rounded style={{backgroundColor: Color.mainBackground}}>
                    <Item>
                        <Input  style={{borderRadius: 30}} placeholderTextColor='#ccc' placeholder="简单输入问题，如“找回密码" />
                        <Icon name="search" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content padder>
                    {this._renderHelpDetail()}
                </Content>
                {this.props.bHelpDetailLoading ? <Spinner1 mode={'overlay'}/> : null}
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {helpDetail,bHelpDetailLoading,help_detail_error_msg} = state.MessagesReducer;
    return {helpDetail,bHelpDetailLoading,help_detail_error_msg};
};
export default connect(mapStateToProps, {getHelpDetail})(Faqs);

