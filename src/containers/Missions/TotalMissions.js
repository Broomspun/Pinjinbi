import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'
import {Container, Content, Button, Footer, FooterTab, Toast} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import {getMemberCanReceiveAccount, getPlatformLists, initializeStatus} from "../../actions";
import {INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT} from "../../actions/types";


class TotalMissions extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(!this.props.platformLists)
            this.props.getPlatformLists();

        this.state = {selectedTab: props.taskType, selectedPlatId: 1, selectedPlatName: ''};

    }
    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.browseTaskObjSuccessed!==null && nextProps.browseTaskObjSuccessed) {
            if(this.state.selectedTab===1) {
                Actions.platformAdvancedTaskStart({PlatId: this.state.selectedPlatId, PlatName: this.state.selectedPlatName})
            }
            else {
                Actions.platformBrowseTaskStart({PlatId: this.state.selectedPlatId, PlatName: this.state.selectedPlatName})
            }
        }
        if(nextProps.browseTaskObjSuccessed!==null && !nextProps.browseTaskObjSuccessed) {
            Toast.show({
                text: nextProps.browseTaskObjMsg,
                buttonText: "是",
                type: "danger",
                duration: 2000
            });
            this.props.initializeStatus(INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT);
        }
    }


    _renderTabs = ()=>{
        const {selectedTab} = this.state;
        if(selectedTab===1) {
            return (
                <View style={{flex: 1, ...Styles.RowCenterBetween, paddingHorizontal:15}}>
                    <Button
                        onPress = {()=>this.setState({selectedTab: 1})}
                        style={{flex:1, backgroundColor: Color.DarkerLightBlue, borderColor: Color.DarkerLightBlue, borderWidth: 1,borderBottomLeftRadius: 30, borderTopLeftRadius: 30,borderBottomRightRadius: 0, borderTopRightRadius: 0}} block info>
                        <Text style={{color: 'white', fontSize: Styles.fontNormal}}>垫付任务</Text>
                    </Button>
                    <Button transparent
                            onPress = {()=>this.setState({selectedTab: 2})}
                            style={{flex:1, borderBottomRightRadius: 30, borderTopRightRadius: 30, borderWidth: 1, borderColor: Color.Border}} block>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>浏览任务</Text>
                    </Button>
                </View>
            )

        }
        else {
            return (
                <View style={{flex: 1, ...Styles.RowCenterBetween, paddingHorizontal:15}}>
                    <Button
                        onPress = {()=>this.setState({selectedTab: 1})}
                        style={{flex:1, backgroundColor: 'white',borderColor: Color.Border, borderBottomLeftRadius: 30,borderWidth: 1, borderTopLeftRadius: 30}} block info>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>垫付任务</Text>
                    </Button>
                    <Button
                        onPress = {()=>this.setState({selectedTab: 2})}
                        style={{flex:1, backgroundColor: Color.DarkerLightBlue, borderBottomRightRadius: 30, borderTopRightRadius: 30, borderWidth: 1, borderColor: Color.DarkerLightBlue}} block>
                        <Text style={{color: 'white', fontSize: Styles.fontNormal}}>浏览任务</Text>
                    </Button>
                </View>
            )

        }

    };


    _onStartTask = (PlatId, PlatName,)=> {
        this.setState({selectedPlatId: PlatId});
        this.setState({selectedPlatName: PlatName});

        if(this.state.selectedTab===1) {
            if(this.props.user) {
                const {UserId, Token}  = this.props.user;
                this.props.getMemberCanReceiveAccount(UserId, Token, PlatId, 1);
            }
        }
        else {
            const {UserId, Token}  = this.props.user;
            this.props.getMemberCanReceiveAccount(UserId, Token, PlatId, 2);
        }
    };

    _renderContent() {
        const {selectedTab} = this.state;

        let renderPlatforms;

        let images = [Images.mission_01,null, Images.mission_03, null,Images.mission_02,Images.mission_07, Images.mission_06,null]
        if(this.props.platformLists) {
            const {platformLists} = this.props;
            renderPlatforms = platformLists.map((platform, index)=>{
                if(images[index]){
                    return (
                        <TouchableOpacity key={platform.Id} activeOpacity={.6} style={{flex: 1,flexDirection: 'column', alignItems: 'center'}}
                                          onPress={() => this._onStartTask(platform.Id, platform.PlatName)}>
                            <Image source={images[index]}  style={{width: 60, height: 60}}/>
                            <Text style={{color: Color.textNormal}}>{platform.PlatName}</Text>
                        </TouchableOpacity>
                    )
                }
            })
        }

        if(selectedTab===1) {
            return (
                <View>
                    <View style={{flex: 1, flexDirection:'row', ...Styles.RowCenterBetween, marginTop: 10,
                        backgroundColor: 'white', padding: 10, flexWrap: 'wrap'}}>
                        {renderPlatforms}

                    </View>

                    <View style={{flex: 1, flexDirection:'row', justifyContent:'flex-start', alignItems: 'flex-start',
                        backgroundColor: 'white', padding: 10, flexWrap: 'wrap'}}>
                        <TouchableOpacity style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_04}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>活动任务</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1, flexDirection: 'column', alignItems: 'center'}}>
                            <Image source={Images.mission_05}  style={{width: 60, height:60}}/>
                            <Text style={{color: Color.textNormal}}>预售任务</Text>
                        </TouchableOpacity>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}></View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}></View>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center'}}></View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={{flex: 1, flexDirection:'row', ...Styles.RowCenterBetween, marginTop: 10,
                        backgroundColor: 'white', padding: 10, flexWrap: 'wrap'}}>
                        {renderPlatforms}
                    </View>
                </View>
            )
        }
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginTop: 10}}>
                    {this._renderTabs()}
                    {this._renderContent()}
                </Content>
                <Footer>
                    <FooterTab  style={{flex: 1, flexDirection: 'row',backgroundColor: '#deedff', justifyContent: 'space-around', paddingLeft: 15, paddingRight: 15, alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.home()}>
                                <Image source={Images.homeIcon} style={{width: 26, height: 26}} />
                                <Text style={{fontSize:14, color:Color.textNormal}}>首页</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}}>
                                <Image source={Images.taskIconActive} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.LightBlue1}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>

                        <View  style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.myorders()}>
                                <Image source={Images.preorderIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.textNormal}}>已接任务 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}} >
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.usercentermain({user: this.props.user})}>
                                <Image source={Images.profileIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.textNormal}}>个人中心</Text>

                            </TouchableOpacity>
                        </View>
                    </FooterTab>

                </Footer>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {platformLists} = state.platformReducer;
    const {browseTaskObj, browseTaskObjMsg, browseTaskObjLoading,browseTaskObjSuccessed} = state.taskReducer;
    return {user, platformLists, browseTaskObj, browseTaskObjMsg, browseTaskObjLoading,browseTaskObjSuccessed};
};
export default connect(mapStateToProps, {getPlatformLists, getMemberCanReceiveAccount, initializeStatus})(TotalMissions);

