/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';

import { Button, Container, Content, Text, Footer, FooterTab } from 'native-base';


class TabaoMain extends Component {

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
    }

    componentWillUpdate(){
    }

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content style={{...Styles.mt10}}>
                    <View  style={{...Styles.RowCenterBetween, ...Styles.shadowStyle, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                        <View style={{...Styles.RowCenterLeft}}>
                            <Image source={Images.platform_icon} style={{width: 20, height: 20, marginRight: 10}} />
                            <Text>最爱大法师</Text>
                        </View>
                        <View>
                            <Text style={{color: Color.orangeColor, fontSize: Styles.fontLarge}}>通过</Text>
                        </View>
                    </View>
                    <View  style={{...Styles.RowCenterLeft, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>收货地址</Text>
                        <Text style={{marginLeft: 10, color: 'black', fontSize: Styles.fontNormal}}>广东 深圳 宝安区 龙华新区清湖路</Text>
                    </View>
                    <View  style={{...Styles.RowCenterLeft, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>联系电话</Text>
                        <Text style={{marginLeft: 10, color: 'black', fontSize: Styles.fontNormal}}>13243778248</Text>
                    </View>
                    <View  style={{...Styles.RowCenterLeft, backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>联系人</Text>
                        <Text style={{marginLeft: 10, color: 'black', fontSize: Styles.fontNormal}}>李昆华</Text>
                    </View>
                    <View style={{marginTop: 25, backgroundColor: Color.LightBlue1, paddingHorizontal: 15, paddingVertical: 10}}>
                        <Text style={{color: 'white'}}>可接单数：今日5单/本周 25单/ 本月80单</Text>
                    </View>

                </Content>
                <Footer>
                    <View style={{flex:1}}>
                        <View style={{...Styles.ColumnCenter, flex: 1}}>
                        <Button full style={{backgroundColor: 'white', height: 60}}>
                            <Text style={{color: Color.LightBlue1, fontSize: Styles.fontLarge}}>+ 新增一个淘宝账户</Text>
                        </Button>
                        </View>
                    </View>
                </Footer>
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
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37, marginLeft: 15, marginRight: 15
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: Color.LightBlue, marginHorizontal: 15
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {id_res} = state.bindInfoData;
    const {user} = state.loginForm;
    return {id_res, user};
};
export default connect(mapStateToProps, {})(TabaoMain);

