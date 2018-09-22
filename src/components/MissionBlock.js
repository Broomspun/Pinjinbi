import React, {Component} from 'react';
import {Image, View, Text, Dimensions, TouchableOpacity, Platform, UIManager} from 'react-native'
import {connect} from 'react-redux';
import {selectOrderId} from "../actions";
import {Images, Constants, Color, Styles} from '@common';
import {SELECTED_TASK_NO} from "../actions/types";
let { width, height } = Dimensions.get('window');

class MissionBlock extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

    }

    _renderOverlay = (completed)=>{
        if(completed)
            return (
                <View style={{
                    flex: 1,
                    left: 0,
                    width: width,
                    height: 100,
                    backgroundColor: 'rgba(0,0,0,.4)',
                    top: 0,
                    position: 'absolute'
                }}>
                    <View style={{...Styles.triangleCorner}}>
                        <Image source={Images.alarm_clock} style={{marginTop: -55, width: 20, height: 20, marginLeft: 15}}/>
                    </View>
                </View>
            );
    };
    render() {
        const {point, goldValue, id, completed, taskType} = this.props;
        let taskTitle = '垫付任务';
        if(taskType===2)
            taskTitle='浏览任务';
        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    marginTop: 10,
                    paddingHorizontal: 15,
                    paddingTop: 20,
                    paddingBottom: 10,
                    borderColor: Color.Border,
                    borderWidth: 1
                }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{
                            flex: 2.5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <Image source={Images.gold_stack_plus}
                                   style={{width: 24, height: 28, alignSelf: 'flex-start'}}/>
                            <Text style={{
                                marginLeft: 10,
                                color: Color.textInfoOrange,
                                fontWeight: '700',
                                fontSize: Styles.fontLarge
                            }}>{point}</Text>
                            <Text style={{
                                marginLeft: 5,
                                color: Color.textInfoOrange,
                                fontSize: Styles.fontNormal
                            }}>{taskTitle}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 30,
                                    paddingVertical: 6,
                                    backgroundColor: Color.DarkLightBlue,
                                    alignSelf: 'flex-end',
                                    paddingHorizontal: 15
                                }}
                                onPress={() => {
                                    !completed ? this.props.selectOrderId(SELECTED_TASK_NO, id) : {}}}

                            >
                                <Text style={{color: 'white'}}>立即接单</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row', ...Styles.ColumnCenter,
                        marginTop: 10,
                        position: 'relative'
                    }}>
                        <View style={{flex: 2.5, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: Color.textLight, fontSize: Styles.fontSmall}}>ID:{id}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{color: Color.textLight, alignSelf: 'flex-end'}}>{goldValue}元</Text>
                        </View>
                    </View>
                    {this._renderOverlay(completed)}
                </View>
            </View>
        );
    }
};
export default connect(null, {selectOrderId})(MissionBlock);
// export {MissionBlock};
