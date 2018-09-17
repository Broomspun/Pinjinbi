import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Image, View, PixelRatio} from 'react-native'
import {Platform, UIManager} from "react-native";

import { Text,Container, Content } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

import {getIntegralGrades} from "../../actions";


class Rules extends Component {

    constructor(props) {

        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        (async () => {
            await this.props.getIntegralGrades();
        })();
    }

    _renderCustomBlock = ()=>{
        if(!this.props.grades) return;

        let itemLength = this.props.grades.length;
        let items = this.props.grades.map((grade, index)=>{
            let backcolor='#f15e1d';
            let backbottomwidth=1/PixelRatio.get();
            if(index%2==1)
                backcolor = '#ba8d2a';

            if(index==itemLength)
                backbottomwidth = 0;

            return (
                <View key={index} style={{...Styles.RowCenterLeft, paddingVertical: 5, borderBottomWidth: backbottomwidth, borderBottomColor: '#d0b374', borderStyle: 'dashed'}}>
                    <View style={{width: 50}}>
                        <View style={{width: 30, height: 30, backgroundColor: backcolor, borderRadius: 40, ...Styles.ColumnCenter}}>
                            <Text style={{color: 'white', paddingVertical: 10}}>{grade.key}</Text>
                        </View>
                    </View>
                    <View><Text style={{fontSize: Styles.fontNormal, color: Color.textNormal}}>{grade.content}</Text></View>
                </View>
            )
        })

        return items;
    };


    render() {
        return(
            <Container>
                <Content style={{backgroundColor: '#ffeec9'}}>
                    <View style={{backgroundColor: 'white', paddingVertical: 15}}>
                        <Image source={Images.rule_back} style={{height: 150, width: null, flex: 1}}/>
                    </View>
                    <View style={styles.cardStyle}>
                        <View>
                            <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal, marginBottom: 20}}>用户等级</Text>
                        </View>
                        <Text style={{fontSize: Styles.fontNormal, color: Color.textNormal}}>积分成长体系是为了给处于不同成长阶段的用户提供更贴 心，更强大的服务，以满足不同成长阶段用户的需求而出 现积分和用户等级对应表</Text>
                    </View>
                    <View style={styles.cardStyle}>
                        {this._renderCustomBlock()}
                    </View>
                    <View style={{...styles.cardStyle, marginBottom: 20}}>
                        <Text style={{fontSize: Styles.fontNormal, color: Color.textNormal}}>每完成一单，可以积5分</Text>
                        <Text style={{fontSize: Styles.fontNormal, color: Color.textNormal}}>不同等级每日限制接单量不等 </Text>
                    </View>
                </Content>

            </Container>
        );
    }
}

const styles = {
    cardStyle: {marginTop: 15, marginHorizontal: 15, backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 25,borderRadius: 10, borderWidth: 1/PixelRatio.get(), borderColor: '#e3b653'}

};
const mapStateToProps = (state) => {
    const {grades} = state.loginForm;
    return {grades}
};
export default connect(mapStateToProps, {getIntegralGrades})(Rules);

