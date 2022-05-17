import React, {Component} from 'react'
import { View, Text, StatusBar, Button, ImageBackground, StyleSheet, BackHandler } from 'react-native'
import {Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import RF from 'react-native-responsive-fontsize'

import MenuButton from '../Components/MenuButton'

import {ScreenWidth, ScreenHeight, bgImage} from '../Constants/Screen'
import { ButtonColorWhite, ButtonColorGreen, ButtonColorRed} from '../Constants/Colors'

export default class MainMenu extends Component{
  constructor(props){
    super(props)

    this.onBackPressed = this.onBackPressed.bind(this)
    BackHandler.addEventListener("hardwareBackPress", this.onBackPressed)
  }

  onBackPressed = () => {
    BackHandler.exitApp()
    Actions.pop()
    return true
  }

  render() {
    return(
      <ImageBackground source = {bgImage} style = {styles.container}>
        <StatusBar hidden = {true} />
        <Text>Main Menu</Text>

        <View style = {styles.btnPlay}>
          <MenuButton color = {ButtonColorWhite} elevation = {3} onPress ={()=>{Actions.push('GameMenu', {player: this.props.player})}} >
            <Icon name = "university" size = {RF(10)} style = {{textAlign: 'center', textAlignVertical: 'center'}}/>
          </MenuButton>
        </View>

        <View style = {styles.btnScores}>
          <MenuButton color = {ButtonColorWhite} elevation = {3} onPress ={()=>{Actions.push('Game', {player: this.props.player})}} >
            <Icon name = "trophy" size = {RF(10)} style = {{textAlign: 'center', textAlignVertical: 'center'}}/>
          </MenuButton>
        </View>

        <View style = {styles.btnPlayStore}>
          <MenuButton color = {ButtonColorWhite} elevation = {3} onPress ={()=>{Actions.push('Game', {player: this.props.player})}} >
            <Icon name = "star" size = {RF(10)} style = {{textAlign: 'center', textAlignVertical: 'center'}}/>
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

  btnPlay: {
    position: 'absolute',
    left: ScreenWidth/2 - ScreenWidth/7,
    top: ScreenHeight/2 - ScreenWidth/7 
  },

  btnScores: {
    position: 'absolute',
    bottom: ScreenWidth/10,
    left: ScreenWidth/4 - ScreenWidth/7
  },

  btnPlayStore: {
    position: 'absolute',
    bottom: ScreenWidth/10,
    right: ScreenWidth/4 - ScreenWidth/7
  }
  
})