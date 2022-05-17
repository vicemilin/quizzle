import React from 'react'
import {Text, View, StyleSheet, Image, Animated, Easing} from 'react-native'
import { ScreenWidth, ScreenHeight } from '../Constants/Screen'
import { btnPushAnimation, btnReleaseAnimation } from '../Constants/Timing'
import RF from 'react-native-responsive-fontsize';

export default class CategoryContainer extends React.PureComponent{
  constructor(props){
    super(props)
    if(!this.props.isChosen){
      this.elevation = new Animated.Value(-7)
    }
    else{
      this.elevation = new Animated.Value(-3)
    }

    this.onPress = this.onPress.bind(this)
  }


  AnimatePush = () => {
    Animated.timing(
      this.elevation,
      {
        toValue: -3,
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
        toValue: -7,
        duration: btnReleaseAnimation["duration"],
        delay: btnReleaseAnimation["delay"],
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  onPress = () => {
    if(!this.props.isChosen){
      this.AnimatePush()
    }
    else{
      this.AnimateRelease()
    }
    this.props.onPress()
    this.forceUpdate()
  }

  render(){
    return(
      <View style = {categoryViewStyles.categoryViewContainer}>
        <View style = {[categoryViewStyles.categoryViewBackground, {backgroundColor: this.props.color["shadow"]}]}>
          
        </View>
        <Animated.View 
            style = {[
              categoryViewStyles.categoryView, 
              {backgroundColor: this.props.color["background"], 
              transform: [{translateY: this.elevation}]}
            ]} 
            onTouchEnd = {this.onPress}
          >
            <Image 
              style = {categoryViewStyles.categoryImage} 
              source = {this.props.category.icon} 
              resizeMethod = "scale"
              resizeMode = "contain"
            />
          </Animated.View>

        <View style = {categoryViewStyles.categoryTextView}>
          <Text style = {categoryViewStyles.categoryText}>{this.props.category.name}</Text>
        </View>
      </View>
    )
  }
}

const categoryViewStyles = StyleSheet.create({
  categoryViewBackground: {
    width: ScreenWidth / 3.5,
    height: ScreenWidth / 3.5,
    borderRadius: ScreenWidth/7,
  },

  categoryView: {
    width: ScreenWidth / 3.5,
    height: ScreenWidth / 3.5,
    borderRadius: ScreenWidth/7,
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },

  categoryTextView:{
    width: ScreenWidth / 3.5,
    height: ScreenWidth / 10 + 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  categoryText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },

  categoryImage: {
    width: ScreenWidth / 5,
    height: ScreenWidth / 5
  },
  categoryViewContainer: {
    height: ScreenWidth / 3 + ScreenWidth/10 + 20,
    width: ScreenWidth / 3.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },

})