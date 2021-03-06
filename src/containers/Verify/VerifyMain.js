import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";
import { Container, Content, Button, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {get_bindInfo, get_idcardInfo, getPlatformLists, getBankInfo} from './../../actions'
import {Spinner1} from "@components";
import _ from 'lodash'


class VerifyMain extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        this.state = {user: props.user};

        const {UserId, Token} = this.state.user;
        if(this.props.user && !this.props.user.bindInfo)
        (async ()=>{
            await this.props.get_bindInfo(UserId, Token);  //API 5.4
            await this.props.get_idcardInfo(UserId, Token);
            if(!this.props.platformLists) await this.props.getPlatformLists();
            await this.props.getBankInfo(UserId, Token);
        })();

        // this.props.get_bindInfo(UserId, Token);
        // this.props.get_idcardInfo(UserId, Token);
    }
    componentWillMount(){
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        console.log('user', nextProps);
    }

    _renderPlatform = () => {
      if(this.props.user && this.props.user.bindInfo && this.props.platformLists ) {
          const {MemberAccount} = this.props.user.bindInfo;
          const {platformLists} = this.props;
          let temp = _.sortedUniqBy(MemberAccount,"Id");

          let images = [Images.p01, Images.p02, Images.p03, Images.p04, Images.p05, Images.p06, Images.p07, Images.p08];

          let platforms = temp.map((platform, index)=>{

             return (
                 <TouchableOpacity key={index} style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}} onPress={()=>Actions.TabaoMain({PlatId: platform.Id, PlatName: platformLists[platform.Id-1]['PlatName']})} >
                     <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                         <Image source={images[platform.Id-1]} style={{width:26, height:26, marginRight:10}}/>
                         {/*<Image source={{uri: platform.Logo}} style={{width:26, height:26, marginRight:10}}/>*/}
                         <Text style={{color: Color.textNormal}}>{platform.PlatName}</Text>
                     </View>
                     <View style={{flex:1,}}>
                         <View style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} >
                             <Text style={{color: Color.LightBlue}}>{platform.IsBindText}</Text>
                             <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                         </View>
                     </View>
                 </TouchableOpacity>
             )
          });

          return (
              <View>
                  {platforms}
              </View>
          )
      }
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content>
                    <View>
                        <Text style={{marginVertical: 15, paddingHorizontal: 15, color: Color.redColor}}>账号信息(账户信息必填，银行卡信息与身份证一致)</Text>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_passport} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定身份证</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} onPress={()=>Actions.verifypassport({user: this.props.user})}>
                                    <Text style={{color: Color.LightBlue}}>{this.props.user.bindInfo ? this.props.user.bindInfo.IsAUTStr:''}</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_bankcard} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定银行卡</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} onPress={()=>Actions.verifybanks()}>
                                    <Text style={{color: Color.LightBlue}}>{this.props.user.bindInfo ? this.props.user.bindInfo.BankStr: ''}</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_qq_number} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>QQ号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} onPress={()=>Actions.verifyqq({user: this.props.user, qq:this.props.user.bindInfo ? this.props.user.bindInfo.QQStr:''})}>
                                    <Text style={{color: Color.LightBlue}}>{this.props.user.bindInfo ? this.props.user.bindInfo.QQStr:''}</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{marginVertical: 15, paddingHorizontal: 15, color: Color.redColor}}>账号信息(任意绑定一个号并通过审核即可完成新手任务)</Text>
                        {this._renderPlatform()}


                    </View>

                </Content>
                {this.props.bBindInfoLoading ? <Spinner1 mode={'overlay'}/> : null}
            </Container>

        );
    }
}
 const mapStateToProps = (state) => {
     const {user, bindInfo, bBindInfoLoading} = state.loginForm;
     const {platformLists,platformListsMsg,bPlatformListsLoading} = state.platformReducer;
     return {user, bindInfo, bBindInfoLoading,platformLists,platformListsMsg,bPlatformListsLoading};
 };
export default connect(mapStateToProps, {get_bindInfo, get_idcardInfo, getPlatformLists, getBankInfo})(VerifyMain);
