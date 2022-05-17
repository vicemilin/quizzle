import React, {PureComponent} from 'react'
import {Text, View, ImageBackground, StatusBar, StyleSheet, BackHandler} from 'react-native'
import {Actions} from 'react-native-router-flux'
import RF from 'react-native-responsive-fontsize'

import { Routes } from '../../Screens/Routes'

import {bgImage, ScreenHeight, ScreenWidth} from '../../Constants/Screen'

export default class Welcome extends PureComponent{
  constructor(props){
    super(props)
    this.finished = this.props.finished ? true : false
    this.btnNextPressed = this.btnNextPressed.bind(this)
  }

  componentDidMount(){
    this.forceUpdate()
  }

  btnNextPressed = () => {
    Actions.push('HelpMainMenu', {player: this.props.player})
  }

  render(){
    if(this.finished){
      return(<Routes player = {this.props.player}/>)
    }
    else{
      return(
        <ImageBackground source = {bgImage} style = {styles.mainContainer}>
          <StatusBar hidden = {true} />
          <View style = {styles.container}>
            <Text style = {styles.btnText}>This is a Welcome Screen</Text>
          </View>

          <View style = {styles.btnNext} onTouchEnd = {this.btnNextPressed}>
            <Text style = {styles.btnText}>Next</Text>
          </View>
        </ImageBackground>
      )
    }
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