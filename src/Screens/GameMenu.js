import React, {Component} from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import RF from 'react-native-responsive-fontsize'
import {Actions} from 'react-native-router-flux'

import MenuButton from '../Components/MenuButton'

import { ButtonColorWhite, ButtonColorGreen, ButtonColorRed} from '../Constants/Colors'
import {ScreenWidth, ScreenHeight, bgImage} from '../Constants/Screen'

export default class GameMenu extends Component{
  constructor(props){
    super(props);

    this.btnPlaySinglePressed = this.btnPlaySinglePressed.bind(this)
    this.btnPlayDoublePressed = this.btnPlayDoublePressed.bind(this)
    this.btnCategoriesPressed = this.btnCategoriesPressed.bind(this)

    this.onBackPressed = this.onBackPressed.bind(this)
    BackHandler.addEventListener("hardwareBackPress", this.onBackPressed)

  }

  onBackPressed = () => {
    Actions.pop()
    return true
  }

  btnPlaySinglePressed = () => {
    Actions.push('Game',{player: this.props.player})
  }

  btnPlayDoublePressed = () => {
    Actions.push('Game', {player: this.props.player})
  }

  btnCategoriesPressed = () => {
    Actions.push('ChooseCategories',{player: this.props.player, firstUse: false})
  }

  render() {
    return(
      <ImageBackground source = {bgImage} style = {styles.container}>
        <StatusBar hidden = {true} />

         <View style = {styles.btnPlaySingle}>
          <MenuButton color = {ButtonColorWhite} elevation = {3} onPress ={this.btnPlaySinglePressed} >
            <Icon name = "user-alt" size = {RF(10)} style = {{textAlign: 'center', textAlignVertical: 'center'}}/>
          </MenuButton>
        </View>

        <View style = {styles.btnCategories}>
          <MenuButton color = {ButtonColorWhite} elevation = {3} onPress ={this.btnCategoriesPressed} >
            <Icon name = "ellipsis-v" size = {RF(10)} style = {{textAlign: 'center', textAlignVertical: 'center'}}/>
          </MenuButton>
        </View>

        <View style = {styles.btnPlayDouble}>
          <MenuButton color = {ButtonColorWhite} elevation = {3} onPress ={this.btnPlayDoublePressed} >
            <Icon name = "user-friends" size = {RF(10)} style = {{textAlign: 'center', textAlignVertical: 'center'}}/>
          </MenuButton>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight
  },

  btnPlaySingle: {
    position: 'absolute',
    top: ScreenHeight/3 - ScreenWidth/7,
    left: ScreenWidth/4 - ScreenWidth/7
  },

  btnPlayDouble: {
    position: 'absolute',
    top: ScreenHeight/3 - ScreenWidth/7,
    right: ScreenWidth/4 - ScreenWidth/7
  },

  btnCategories: {
    position: 'absolute',
    left: ScreenWidth/2 - ScreenWidth/7,
    bottom: ScreenWidth/3,
  }
})