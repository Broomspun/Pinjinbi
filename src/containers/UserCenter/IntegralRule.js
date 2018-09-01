import React, {Component} from 'react';

import {Image, View, PixelRatio} from 'react-native'
import {Platform, UIManager} from "react-native";

import { Text,Container, Content } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';


class IntegralRule extends Component {

    constructor(props) {

        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

    }

    _renderCustomBlock = ()=>{
        let levels =[
            {key: 'L0', value: '0-59分'},
            {key: 'L1', value: '60-239分'},
            {key: 'L2', value: '240-659分'},
            {key: 'L3', value: '660-1439分'},
            {key: 'L4', value: '1440-2699分'},
            {key: 'L5', value: '2700-4599分'},
            {key: 'L6', value: '4560-7139分'},
            {key: 'L7', value: '7140-10559分'},
            {key: 'L8', value: '1056-14939分'},
        ];

      let items = levels.map((level, index)=>{
          let backcolor='#f15e1d';
          let backbottomwidth=1/PixelRatio.get();
          if(index%2==1)
              backcolor = '#ba8d2a';

          if(index==8)
              backbottomwidth = 0;


          return (
              <View key={index} style={{...Styles.RowCenterLeft, paddingVertical: 5, borderBottomWidth: backbottomwidth, borderBottomColor: '#d0b374', borderStyle: 'dashed'}}>
                  <View style={{width: 50}}>
                      <View style={{width: 30, height: 30, backgroundColor: backcolor, borderRadius: 40, ...Styles.ColumnCenter}}>
                          <Text style={{color: 'white', paddingVertical: 10}}>{level.key}</Text>
                      </View>
                  </View>
                  <View><Text style={{fontSize: Styles.fontNormal, color: Color.textNormal}}>{level.value}</Text></View>
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

export default IntegralRule;
