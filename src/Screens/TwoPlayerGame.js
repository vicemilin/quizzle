import React, {Component} from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, BackHandler, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modalbox'

import {ScreenWidth, ScreenHeight, bgImage} from '../Constants/Screen'
import {  firstQuestionDelay, nextQuestionDelay  } from '../Constants/Timing'

import ButtonsContainer from '../Containers/ButtonsContainer'
import QuestionContainer from '../Containers/QuestionContainer'
import Header from '../Components/Header'
import GameOverModal from '../Containers/GameOverModal'

import CreateQuestionSet from '../API/TriviaDB/GetQuestions'

export default class TwoPlayerGame extends Component{
  constructor(props){
    super(props)

    this.isLoadingQuestions = true
  }
  render(){
    return(
      if(this.isLoadingQuestions) return(
        <ImageBackground source = {bgImage} style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <StatusBar hidden = {true} />
          <ActivityIndicator />
        </ImageBackground>
      )
      else return (
        
      )
    )
  }
}
