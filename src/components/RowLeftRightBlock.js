import React from 'react';
import {View, Text} from 'react-native'
import {Images, Constants, Color, Styles} from '@common';

const RowLeftRightBlock = (props) => {
    const {leftTitle, rightTitle,l_style, r_style} = props;
    return (
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex:1}}>
                <Text style={{...l_style}}>{leftTitle}</Text>
            </View>
            <View style={{flex:1,...Styles.ColumnCenterRight,}}>
                <Text style={{...r_style}}>{rightTitle}</Text>
            </View>
        </View>
    );
};

export { RowLeftRightBlock};
