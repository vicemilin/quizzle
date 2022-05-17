import React, {PureComponent} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'

import { ScreenWidth, ScreenHeight } from '../Constants/Screen'
import { ButtonColorGreen, ButtonColorRed, ButtonColorWhite } from '../Constants/Colors'
import { btnFadeInAnimation, btnFadeOutAnimation, btnPushAnimation, btnReleaseAnimation} from '../Constants/Timing'

export default class MyAwesomeButton extends React.Component{
  static propTypes = {
    elevation: PropTypes.number,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    answer: PropTypes.string,
  }

  static defaultProps = {
    elevation: 8,
    disabled: false,
    onPress: null,
    answer: "Hello",
  }

  constructor(props){
    super(props)
    this.elevation = new Animated.Value(-this.props.elevation)
    this.answerOpacity = new Animated.Value(0)

    this.state = {
      color: ButtonColorWhite
    }
  }

  AnimatePush = () => {
    if(this.props.disabled) return;
    Animated.timing(
      this.elevation,
      {
        toValue: 0,
        duration: btnPushAnimation["duration"],
        delay: btnPushAnimation["delay"],
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  AnimateRelease = () => {
    if(this.props.disabled) return;
    Animated.timing(
      this.elevation,
      {
        toValue: -this.props.elevation,
        duration: btnReleaseAnimation["duration"],
        delay: btnReleaseAnimation["delay"],
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
    this.props.onPress()
  }

  ChangeColor = (color) => {
    if(color == 'white'){
      this.setState({color: ButtonColorWhite})
      return
    }
    if(color == 'green'){
      this.setState({color: ButtonColorGreen})
      return
    }
    this.setState({color: ButtonColorRed})
  }

  ShowAnswer = (delay = 0, callback = () => {}) => {
    Animated.timing(this.answerOpacity, {
      toValue: 1,
      easing: Easing.ease,
      delay: btnFadeInAnimation["delay"] + delay,
      duration: btnFadeInAnimation["duration"],
      useNativeDriver: true
    }).start(callback);
  }

  HideAnswer = (callback) => {
    Animated.timing(this.answerOpacity, {
      toValue: 0,
      delay: btnFadeOutAnimation["delay"],
      duration: btnFadeOutAnimation["duration"],
      useNativeDriver: true
    }).start(callback);
  }

  componentWillUnmount = () => {
    Animated.timing(this.elevation).stop()
    Animated.timing(this.answerOpacity).stop()
  }

  render(){
    return(
      <View>
        <View
          style = {[styles.outerView, {
            backgroundColor: this.state.color["shadow"]
          }]}
          activeOpacity = {1}
        />

        <Animated.View 
        onTouchStart = {this.AnimatePush} 
        onTouchEnd = {this.AnimateRelease}
        style = {[
          styles.innerView, 
          { 
            backgroundColor: this.state.color["background"],
            transform: [{translateY: this.elevation}]
          }
        ]}>
          <Animated.View style={{opacity: this.answerOpacity}} >
            <Text style = {[styles.textStyle, {color: this.state.color["text"]}]}>{this.props.answer}</Text>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  innerView: {
    width: ScreenWidth/1.5,
    height: ScreenHeight/12,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },

  outerView:{
    width: ScreenWidth/1.5,
    height: ScreenHeight/12,
    borderRadius: 22,
  },

  textStyle:{
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})