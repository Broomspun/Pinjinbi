import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';


class ReactCaptchaGenerator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: props.height,
            width: props.width,
            textColor: props.textColor,
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            paddingLeft: props.paddingLeft,
            paddingTop: props.paddingTop,
            length: props.length,
            background: props.background,
            result: props.result
        };
        this.setData = this.setData.bind(this);
    }

    componentWillMount() {
        this.setData();
        console.log(this);
    }

    componentWillReceiveProps({toggleRefresh}) {
        if (toggleRefresh != this.props.toggleRefresh) {
            this.setData();
        }
    }

    setData() {
        const text = this.props.text;
        let length = this.state.length;
        if (text != '') {
            length = text.length;
        }
        this.text = [];
        this.originText = [];
        this.possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            let char = this.possible.charAt(Math.floor(Math.random() * this.possible.length));
            if (text !== '') {
                char = text[i];
            }
            this.text.push({
                captchaStyle: {paddingLeft: 5, fontFamily: this.state.fontFamily, fontSize: 26, color: `${this.props.textColor ? this.props.textColor : '#'+Math.floor(Math.random()*16777215).toString(16)}`, transform: [{rotate: `${Math.random() * 1.57 + 0}rad`}]},
                character: `${char}`,
                key: i
            }

            );
            this.originText.push(char);
        }

        this.setState({result: this.originText.join(''), captchas: this.text});

        // this.setData(this.props);
    }

    render() {
        console.log(this.state);
        return (
        <View style={{flexDirection: 'row', flex: 1, justifyContent:'flex-end', paddingRight: 5}}>
            {this.state.captchas.map(captcha =>
            <Text style={captcha.captchaStyle} key={captcha.key}>{captcha.character}</Text>)}
        </View>
    )
    }
}

ReactCaptchaGenerator.defaultProps = {
    height: 100,
    width: 100,
    textColor: false,
    fontFamily: 'Verdana',
    fontSize: '20',
    paddingLeft: '20',
    paddingTop: '60',
    length: '4',
    background: 'none',
    text: '',
    toggleRefresh: false,
    result: ''
};

export {ReactCaptchaGenerator};
