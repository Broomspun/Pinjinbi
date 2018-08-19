import React, {Component} from 'react';
import Timer from 'react-timer-mixin';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';


class Loto extends Component {
    state = {visibleLotaModal: false};
    constructor(props) {
        super(props);


        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentWillMount(){
        console.log('loto state',this.state);

    }
    componentDidUpdate() {
        console.log('update',this.state);

        if(this.state.visibleLotaModal) {
            Timer.setTimeout(() => {
                this.setState({visibleLotaModal: false})
            }, 2000);
        }
    }

    _renderLotoModal = () => (
        <View style={{borderRadius: 10, width: 300, height: 270, backgroundColor: 'white', paddingVertical: 40 }}>
            <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{marginBottom: 40, color:'#e84e40', fontSize: Styles.fontLarge, fontWeight: '700'}}>恭喜您获得***</Text>
                <View style={{ borderColor: '#e84e40', width: 90, height: 90, borderWidth: 5, borderRadius: 50,justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={Images.smileFace} style={{width: 45, height: 45}} />
                </View>
            </View>
        </View>
    );

    onButtonPress(){
        this.setState({visibleLotaModal: true});
    }

    render() {
        return(
            <View style={{flex: 1,  ...Styles.ColumnCenter}}>
                <View >
                    <Modal  isVisible={this.state.visibleLotaModal} style={{...Styles.ColumnCenter}}>
                        {this._renderLotoModal()}
                    </Modal>
                    <View style={{flex:1, width: Styles.width,...Styles.ColumnCenter,backgroundColor: 'green' }}>
                        <Image source={Images.lotoBakcTop} style={{flex:1,width: Styles.width,height:null }}/>
                    </View>
                    <View style={{flex:1, width: Styles.width, backgroundColor:'#f8655e',...Styles.ColumnCenterBottom}}>
                        <Button rounded style={{backgroundColor: '#ffeded', alignSelf: 'center', position: 'absolute', bottom: 70}}>
                            <Text style={{color: '#f8655e', fontSize: Styles.fontLarge, paddingHorizontal: 20}}>剩2次抽奖机会</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ ...Styles.ColumnCenter, position: 'absolute', backgroundColor: 'transparent'}}>
                    <Image source={Images.lotoBakcground} style={{width: 300, height:300}}/>
                </View>
                <View style={{ ...Styles.ColumnCenter, position: 'absolute'}}>
                    <TouchableOpacity style={{...Styles.ColumnCenter}} onPress={this.onButtonPress.bind(this)}>
                        <Image source={Images.lotoStart}  style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Loto;
