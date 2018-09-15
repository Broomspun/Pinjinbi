import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Platform, UIManager, FlatList, View, PixelRatio, Image} from "react-native";

import { Text, ListItem, Container, Content } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from 'react-native-router-flux';
import {Spinner1} from "@components";
import { getSystemMessages} from './../../actions'


class AnnounceMessagesList extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(props.user) {
            const {UserId, Token} = props.user;
            (async () => {
                if(!this.props.announceMessages)
                    await this.props.getSystemMessages(UserId,Token,0);
            })()
        }
    }

    componentWillMount(){
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    renderRow = (message)=> {
        return (
            <ListItem onPress={()=>Actions.newsdetail({album: news.item})} style={{paddingTop:10, paddingBottom:10, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.borderNormal}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: Color.textNormal, fontSize: 14, marginRight: 5}}>{news.item.title}</Text>
                        {/*<Button style={{height: 24}} info rounded onPress={()=>Actions.newsdetail({album: news.item})}><Text style={{fontSize: 12}}>New</Text></Button>*/}
                        <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Color.primary, paddingLeft: 10, paddingRight:10, marginLeft: 5, height: 20}}>
                            <Text style={{fontSize: 10, color: 'white'}}>New</Text>
                        </View>
                    </View>
                    <Text style={{fontSize: 12, color:Color.textLight, alignSelf:'flex-start'}}>{news.item.publishedAt}</Text>
                </View>
            </ListItem>
        );
    };


    renderLists() {
        const {announceMessages} = this.props;

        if (announceMessages==null)
            return (<Text></Text>);

        if(announceMessages.length===0)
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
                    data= {announceMessages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {this.renderRow}
                />
            ) ;
    }

    render() {
        return(
            <Container>
                <Content>
                    {this.renderLists()}
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {announceMessages,bAnnounceMessageLoading,announce_error_msg} = state.MessagesReducer;
    return {user, announceMessages,bAnnounceMessageLoading,announce_error_msg};
};
export default connect(mapStateToProps, {getSystemMessages})(AnnounceMessagesList);

