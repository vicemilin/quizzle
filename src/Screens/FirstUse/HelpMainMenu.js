import React, {PureComponent} from 'react'
import {Text, View, ImageBackground, StatusBar, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'
import RF from 'react-native-responsive-fontsize'

import {bgImage, ScreenHeight, ScreenWidth} from '../../Constants/Screen'

export default class HelpMainMenu extends PureComponent{
  constructor(props){
    super(props)

    this.btnNextPressed = this.btnNextPressed.bind(this)
    this.btnBackPressed = this.btnBackPressed.bind(this)
  }

  btnNextPressed = () => {
    Actions.push('HelpGameMenu',{player: this.props.player})
  }

  btnBackPressed = () => {
    Actions.pop()
    return true
  }

  render(){
    return(
      <ImageBackground source = {bgImage} style = {styles.mainContainer}>
        <StatusBar hidden = {true} />
        <View style = {styles.container}>
          <Text style = {styles.btnText}>This is a HelpMainMenu Screen</Text>
        </View>

        <View style = {styles.btnNext} onTouchEnd = {this.btnNextPressed}>
          <Text style = {styles.btnText}>Next</Text>
        </View>

        <View style = {styles.btnBack} onTouchEnd = {this.btnBackPressed}>
          <Text style = {styles.btnText}>Back</Text>
        </View>

      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    width: ScreenWidth * 0.9,
    height: ScreenHeight * 0.7
  },

  btnNext: {
    position: "absolute",
    bottom: ScreenHeight/20,
    right: ScreenWidth/10
  },

  btnBack: {
    position: "absolute",
    bottom: ScreenHeight/20,
    left: ScreenWidth/10
  },

  btnSkip:{
    position: "absolute",
    top: ScreenHeight/20,
    left: ScreenWidth/20
  },

  btnText: {
    color: 'white',
    fontSize: RF(3),
    fontWeight: 'bold'
  }
})