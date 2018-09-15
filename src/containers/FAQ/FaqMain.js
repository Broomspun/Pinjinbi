import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Platform, UIManager, Image, View, Text, PixelRatio, TouchableOpacity} from 'react-native'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock,Spinner1} from '@components'
import {getHelpLists} from "../../actions";


class FaqMain extends Component {

    componentWillMount(){
    }


    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.props.getHelpLists();
    }

    _renderLists = ()=>{
        if (this.props.helpLists)
            return (
                <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 12,borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder }}>
                    {this.props.helpLists.map((help)=>{
                        return (
                            <View key={help.Id} style={{paddingVertical: 12, width: '50%',  ...Styles.ColumnCenter}}>
                                <TouchableOpacity activeOpacity={.8} onPress={()=>Actions.faqs({helpId: help.Id})}>
                                    <Image source={{uri: help.Logo}} style={{width: 60, height: 60}}/>
                                </TouchableOpacity>
                                <Text style={{marginTop: 10, color: Color.textNormal, fontSize: Styles.fontSmall}}>{help.ClassName}</Text>
                            </View>
                        )
                    })
                    }
                </View>
            )
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.mainBackground, marginTop: 10, marginBottom: 10}}>
                <Content>
                    <View style={{...Styles.shadowStyle}}>
                        {this._renderLists()}
                    </View>
                    <View style={{ ...Styles.shadowStyle,marginTop: 10,  marginLeft: 15, marginRight: 15, backgroundColor:'transparent'}}>
                        <View style={{flexDirection:'row', ...Styles.RowCenterLeft, paddingVertical: 5, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder}}>
                            <Image source={Images.faq_chat_icon} style={{width: 24, height: 24, marginRight: 10}} />
                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>在线客服（09:00-22:00）</Text>
                        </View>
                    </View>
                    <View style={{...Styles.basicStyle}}>
                        <Text style={{color: Color.textNormal}}>

                            所有常见问题都有相应的解决方案，请参考常见问题自主解决，如
                            果常见问题无法解决您的问题在咨询客服，由于客服咨询量较大，
                            请尽可能的描述清楚您的问题，以便快速解决
                        </Text>
                    </View>

                    <Button block style={{marginTop: 20, borderRadius: 5, backgroundColor: Color.LightBlue, marginLeft: 15, marginRight: 15}} >
                        <Text style={{color: 'white',fontSize: Styles.fontLarge}}>QQ咨询</Text>
                    </Button>
                </Content>
                {this.props.bHelpListsLoading ? <Spinner1 mode={'overlay'}/> : null}
            </Container>
        );
    }
}

const styles = {
    cardStyle_1:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        paddingBottom: 10,
        borderColor:
        Color.borderNormal,
        borderBottomWidth:1
    },
    tabStyle: {
        backgroundColor: 'white',

    },
    activeTabStyle: {
        backgroundColor: 'white',
    },
    textStyle: {
        color: Color.textDark
    },
    activeTextStyle: {
        color: Color.LightBlue
    },
    tabBarUnderlineStyle:{
        backgroundColor: Color.LightBlue
    },
    textBlockDownStyle: {fontSize: Styles.fontLarge, color: Color.textInfoOrange, borderTopWidth:1, borderColor: Color.borderNormal},
};

const {cardStyle_1,textBlockDownStyle} = styles;

const mapStateToProps = (state) => {
    const {helpLists,qqConsult,bHelpListsLoading} = state.MessagesReducer;
    return {helpLists,qqConsult,bHelpListsLoading};
};
export default connect(mapStateToProps, {getHelpLists})(FaqMain);

