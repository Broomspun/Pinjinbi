import React, {Component} from 'react';
import Timer from 'react-timer-mixin';
import {Platform, UIManager, Image, View, Text, FlatList, PixelRatio} from 'react-native'
import Modal from 'react-native-modal'

import {Container, Content, Button, ListItem} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import connect from "react-redux/es/connect/connect";
import {getLotoHistory} from "../../actions";
import {Actions} from "react-native-router-flux";

class LotoWinningHistory extends Component {

    constructor(props) {
        super(props);


        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user && this.props.lotoObj) {
            const {UserId, Token} = this.props.user;
            this.props.getLotoHistory(UserId, Token, this.props.lotoObj.ActivitiesId);
        }

        this.state = {visibleLotoFailModal: false};

    }
    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.lotoHistoryObj) {
            this.setState ({visibleLotoFailModal: true});
        }

    }

    componentDidUpdate() {
        if(this.state.visibleLotoFailModal) {
            Timer.setTimeout(() => {
                this.setState({visibleLotoFailModal: false})
            }, 5000);
        }
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

    _renderHistory = ()=> {
        if(this.props.lotoHistoryObj && this.props.lotoHistoryObj.length===0)
            return (
                <View style={{...Styles.ColumnCenter}}>
                    <Image source={Images.empty_messages_icon} style={{width: 64, height: 64}}/>
                    <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时消息哦！</Text>
                </View>
            );
        else
            return (
                <FlatList
                    data= {this.props.lotoHistoryObj}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {this.renderRow}
                />
            ) ;
    }

    _renderLotoModal = () => (
        <View style={{borderRadius: 10, width: 300, height: 240, backgroundColor: 'white', paddingVertical: 15 }}>
            <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 20, color:Styles.textNormal, fontSize: Styles.fontNormal}}>中奖记录</Text>
                {this._renderHistory()}
            </View>
            <View style={{paddingHorizontal: 15, paddingBottom: 20, marginTop: 20}}>
                <Button block style={{backgroundColor: Color.LightBlue1, paddingHorizontal: 20}} onPress={()=>{this.setState({visibleLotoFailModal: false})}}>
                    <Text style={{color: 'white', fontSize: Styles.textLarge}}>确认</Text>
                </Button>
            </View>
        </View>
    );

    onButtonPress(){

    }

    render() {
        return(
            <View >
                <Modal  isVisible={this.state.visibleLotoFailModal} style={{...Styles.ColumnCenter}}>
                    {this._renderLotoModal()}
                </Modal>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {lotoObj, lotoHistoryObj} = state.lotoReducer;
    return {user, lotoObj,lotoHistoryObj};
};
export default connect(mapStateToProps, {getLotoHistory})(LotoWinningHistory);
