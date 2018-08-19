import React, {Component} from 'react';

import {Platform, UIManager,Image, View, Linking, Text} from 'react-native'

import { Container, Content, Button, List, ListItem} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'

class Prize extends Component {

    state = {
    };
    componentWillMount(){
    }
    renderConnect(index) {
        if(index!==6)
            // return <View></View>;
        return (<View style={{flex:1, height: 2, width: null,alignSelf:'center', borderBottomWidth:2, borderColor: Color.DarkLightBlue, marginHorizontal: 3 }}></View>);

    }

    adjustFlex(index) {
        if(index==6) return 0;
        return 1;
    }

    getBackground(bActive) {
        if(bActive)
            return Color.DarkLightBlue;

        return 'transparent'
    }
    getColor(bActive){

        if(!bActive)
            return Color.DarkLightBlue;

        return 'white'

    }

    renderItems()  {
        let items = [
            {point:'+1', date:'07-22', id: 0, active: false},
            {point:'+2', date:'07-23', id: 1, active: true},
            {point:'+3', date:'07-24', id: 2, active: false},
            {point:'+4', date:'07-25', id: 3, active: false},
            {point:'+5', date:'07-26', id: 4, active: false},
            {point:'+6', date:'07-27', id: 5, active: false},
            {point:'+7', date:'07-28', id: 6, active: false},
        ];

        return items.map(item=>

            <View key={item.id} style={{ flex: this.adjustFlex(item.id), alignItems: 'flex-start', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: 34, height: 34, borderRadius: 17, backgroundColor: this.getBackground(item.active), borderColor: Color.DarkLightBlue, borderWidth: 2,  alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: this.getColor(item.active), fontSize: Styles.fontSmall}}>{item.point}</Text>
                    </View>
                    {this.renderConnect(item.id)}
                </View>
                <Text style={{color: Color.textLight, fontSize: Styles.fontSmaller, marginTop:5}}>{item.date}</Text>
            </View>
        );
    };


    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    render() {

        return(
            <Container>
                <Content style={{backgroundColor: Color.mainBackground, paddingTop: 15}}>
                    <View style={viewWrapper}>
                        <Image source={Images.prizeStack} style={{ marginLeft: 30, width: 30,height:36, marginRight: 40 }}/>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{color: 'white'}}>我的积分</Text>
                            <Text style={{color: 'white', fontSize: Styles.fontLarge, fontWeight: '600'}}>2238</Text>
                        </View>
                    </View>
                    <View style={{...Styles.cardStyleEmpty, paddingVertical: 40, paddingHorizontal: 15, alignItems: 'center'}}>
                        <View style={{backgroundColor: Color.LighterBlue, height: 130, width: 130, borderRadius:65, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: Color.DarkLightBlue, height: 110, width: 110, borderRadius:55, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: 'white', fontSize: Styles.fontLarger}}>签到</Text>
                                <Text style={{color: 'white', fontSize: Styles.fontNormal}}>+1积分</Text>
                            </View>
                        </View>
                        <Text style={{color: Color.textLight, paddingTop: 20, paddingBottom: 45}}>已经连续签到2天/累计获得2积分</Text>
                        <View style={{flexDirection: 'row', paddingHorizontal: 0, justifyContent: 'space-between'}}>
                            {this.renderItems()}
                        </View>
                        <Text style={{color: Color.textLight, paddingTop: 20, paddingBottom: 30}}>提醒：签到获取的积分不计入等级积分</Text>
                    </View>

                </Content>
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
    textBlockDownStyle: {fontSize: Styles.fontLarge, color: Color.textInfoOrange, borderTopWidth:1, borderColor: Color.borderNormal},
    viewWrapper : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        backgroundColor: Color.LightBlue1,
        paddingVertical: 40,
        marginBottom: 10}

};

const {cardStyle_1,textBlockDownStyle, viewWrapper} = styles;

export default Prize;
