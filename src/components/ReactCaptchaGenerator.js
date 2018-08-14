import React, { Component } from 'react';
import { View, Text} from 'react-native';

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
            captchaCode: props.fv_captchaCode
        };
        this.setData = this.setData.bind(this);
    }

    componentWillMount() {
        this.setData();
    }

    componentWillReceiveProps({toggleRefresh}) {
        if (toggleRefresh != this.props.toggleRefresh) {
            this.setData();
        }
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    setData() {
        const text = this.props.captchaCode;
        let length = this.props.captchaCode.length;
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
                    captchaStyle: {
                        paddingLeft: 5,
                        fontFamily: this.state.fontFamily,
                        fontSize: 26,
                        color: `${this.props.textColor ? this.props.textColor : this.getRandomColor()}`,
                        transform: [{rotate: `${Math.random() * 1.57 + 0}rad`}]
                    },
                    character: `${char}`,
                    key: i
                }
            );
            this.originText.push(char);
        }

        this.setState({captchaCode: this.originText.join(''), captchas: this.text});
    }

    render() {
        return (
        <View style={{flexDirection: 'row', height: null, justifyContent:'flex-end', paddingRight: 5}}>
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
};

export {ReactCaptchaGenerator};
