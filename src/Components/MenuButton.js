import React from 'react'
import {Text, View, StyleSheet, Animated, Easing} from 'react-native'
import { ScreenWidth } from '../Constants/Screen'
import { btnPushAnimation, btnReleaseAnimation } from '../Constants/Timing'

export default class MenuButton extends React.PureComponent{
  constructor(props){
    super(props)
    this.props.elevation ? this.elevation = new Animated.Value(-this.props.elevation) : this.elevation = new Animated.Value(-7)
    this.AnimatePush = this.AnimatePush.bind(this)
    this.AnimateRelease = this.AnimateRelease.bind(this)
    this.size = this.props.size || 1
  }

  AnimatePush = () => {
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
    Animated.timing(
      this.elevation,
      {
        toValue: -this.props.elevation || -7,
        duration: btnReleaseAnimation["duration"],
        delay: btnReleaseAnimation["delay"],
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
    this.props.onPress()
  }

  render(){
    return(
      <View>
        <View style = {[
          styles.buttonBackground, 
          {
            backgroundColor: this.props.color["shadow"],
            width: ScreenWidth / 3.5 * this.size,
            height: ScreenWidth / 3.5 * this.size,
            borderRadius: ScreenWidth / 7 * this.size
          }
          ]}>
        </View>
          <Animated.View 
          style = {[
            styles.button, 
            {backgroundColor: this.props.color["background"], 
            width: ScreenWidth / 3.5 * this.size,
            height: ScreenWidth / 3.5 * this.size,
            borderRadius: ScreenWidth / 7 * this.size,
            transform: [{translateY: this.elevation}]}
          ]} 
          onTouchStart = {this.AnimatePush}
          onTouchEnd = {this.AnimateRelease}
        >
          {this.props.children}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonBackground: {
    /*width: ScreenWidth / 3.5,
    height: ScreenWidth / 3.5,
    borderRadius: ScreenWidth/7,*/
  },

  button: {
    /*width: ScreenWidth / 3.5,
    height: ScreenWidth / 3.5,
    borderRadius: ScreenWidth/7,*/
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
})