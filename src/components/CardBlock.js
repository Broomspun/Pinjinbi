import React from 'react';
import { View, Text } from 'react-native';
import {Color} from '@common';

const CardBlock = (props) => {
    return (
        <View style={{...Styles.cardStyle}}>
            <View style={{flex: 3}} >
                <Text style={{color: props.cardTitleColor}}>{props.cardTitle}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-end'}}>
                <Text style={{alignSelf:'flex-end', color: props.cardValueColor}}>{props.cardValue}</Text>
                {props.children}
            </View>
        </View>
    );
};

export { CardBlock };
