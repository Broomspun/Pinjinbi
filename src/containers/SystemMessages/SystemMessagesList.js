import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager, FlatList, View, Image} from "react-native";

import { Container, Content, Icon, Button, Text} from 'native-base';
import {Images, Constants, Styles} from '@common';
import { getSystemMessages} from './../../actions'
import {Actions} from 'react-native-router-flux';
import {Spinner1} from "../../components";

class SystemMessagesList extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        if(props.user) {
            console.log(props.user);
            const {UserId, Token} = props.user;
            (async () => {
                if(!this.props.systemMessages)
                    await this.props.getSystemMessages(UserId,Token,1);
            })()
        }
    }

    componentWillMount(){
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    renderRow = (news)=> {
        return (
            <View style={{flex: 1, padding: 0, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#f8f8f8', paddingTop: 10, paddingBottom: 10}}>
                    <View style={{flex: 1}} />
                    <View style={{flex: 1,padding: 5, backgroundColor: '#ebebeb', borderRadius: 50}}>
                        <Text style={{color: '#bbb',fontSize: 14, alignSelf:'center'}}>{news.item.PubTime.substring(0,10)}</Text>
                    </View>
                    <View style={{flex: 1}} />
                </View>
                <View style={{marginBottom: 10, paddingLeft: 15, paddingRight:15, paddingTop: 10, paddingBottom: 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#222', fontSize: 14, paddingTop: 10, paddingBottom: 10, marginRight: 5}}>{news.item.Title}</Text>
                        <Icon name="circle" type='FontAwesome' style={{color:'#ff6b23', fontSize: 10, marginBottom: 15}}/>
                    </View>
                    <View style={{borderTopWidth: 1,borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, borderColor: '#dfdfdf'}}>
                        <Text  style={{fontSize: 14, color:'#5f5f5f', alignSelf:'flex-start'}}>{news.item.Memo.substring(0,80)+'...'}</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent:'flex-end',paddingLeft: 15, paddingRight:15, marginBottom: 10}}>
                    <Button rounded info small iconRight onPress ={ ()=> Actions.noticedetail({album: news.item})} >
                        <Text>消息详情</Text>
                        <Icon name="chevron-right" type="Entypo" />
                    </Button>
                </View>
            </View>
        );
    };


    renderLists() {
        const {systemMessages} = this.props;

        if (systemMessages==null)
            return (<Text></Text>);

        if(systemMessages.length===0)
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height - 250}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.empty_messages_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时消息哦！</Text>
                    </View>
                </View>
            );

        else
            return (
                <FlatList
                    data= {systemMessages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {this.renderRow}
                />
            ) ;
    }

    render() {
        return(
            <Container >
                <Content>
                    {this.renderLists()}
                </Content>
                {this.props.bSystemMessageLoading ? <Spinner1 mode={'overlay'}/> : null}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {systemMessages,bSystemMessageLoading,system_error_msg} = state.MessagesReducer;
    return {user,systemMessages,bSystemMessageLoading,system_error_msg};
};

export default connect(mapStateToProps, {getSystemMessages})(SystemMessagesList);

