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

export default class Game extends Component{
  constructor(props){
    super(props)
    //this.QuestionSet = DefaultSet.map(item => new Question(item))
    this.score = 0
    this.answeredCorrectly = 0
    this.questionCount = 0

    this.timeLeft = 60000

    this.startTimer = this.startTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)

    this.onBackPressed = this.onBackPressed.bind(this)
    this.ModalYesPressed = this.ModalYesPressed.bind(this)
    this.ModalNoPressed = this.ModalNoPressed.bind(this)
    this.CalculateTimeBonus = this.CalculateTimeBonus.bind(this)

    this.isComponentMounted = false

    this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.onBackPressed)
    this.isLoadingQuestions = true
    this.gameOver = false

    this.twoPlayerMode = this.props.twoPlayerMode || false
    this.playerOneScore = this.props.playerOneScore || 0 
  }

  componentDidMount = async () => { 
    this.isComponentMounted = true
    //Second Player
    if(this.props.questionSet){
      this.QuestionSet = this.props.questionSet
      this.isLoadingQuestions = false
      if(this.isComponentMounted){
        this.startAnimations()
        this.forceUpdate()
      }
      return
    }

    await CreateQuestionSet(
      15, this.props.player,
      (questionSet) =>{
        this.QuestionSet = questionSet
        this.isLoadingQuestions = false
        if(this.isComponentMounted){
          this.startAnimations()
          this.forceUpdate()
        }
      },
      (error) => {
        alert(error)
        this.onBackPressed()
      }
    )
  }

  startTimer = () => {
    if(!this.isComponentMounted){
      return
    }
    const endTime = new Date().getTime() + this.timeLeft
    this.interval = setInterval(() => {
      this.timeLeft = endTime - new Date()
      if(this.timeLeft <= 100){
        this.gameOver = true
        this.timeLeft = 0
        clearInterval(this.interval)
      }
      this.forceUpdate()
    },100)
  }

  pauseTimer = () => {
    clearInterval(this.interval)
  }


  startAnimations = () => {
    setTimeout(()=> {
      if(!this.isComponentMounted){
        return
      }
      this.refs.QC.AnimateFirst()
    }, firstQuestionDelay)

    setTimeout(() => {
      if(!this.isComponentMounted){
        return
      }
      this.refs.BC.ShowAnswers()
    }, firstQuestionDelay + 500)
  } 

  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  onBackPressed = () => {
    this.isComponentMounted = false
    clearInterval(this.interval)
    Actions.pop()
    return true
  }


  GoToNextQuestion = () => {
    if(!this.isComponentMounted){
      return
    }
    this.questionCount = this.questionCount + 1 
    if(this.questionCount == this.QuestionSet.length){
      this.gameOver = true
      this.forceUpdate()
    }
    this.refs.QC.GoToNextQuestion()
    this.refs.BC.GoToNextQuestion()
  }

  onAnswerPressed = (correct) => {
    this.pauseTimer()
    if(correct){
      this.answeredCorrectly++
      this.AddScore(this.QuestionSet[this.questionCount].difficulty)
    }
    else{
      this.FindRightAnswer()
    }
    setTimeout(()=> {
      this.GoToNextQuestion()
    }, nextQuestionDelay)
  }

  AddScore = (difficulty) => {
    if(!this.isComponentMounted){
      return
    }

    if(difficulty === "easy"){
      this.score = this.score + 100
      this.refs.Header.incrementScore(100)
      this.forceUpdate()
      return
    }
    if(difficulty === "hard"){
      this.score = this.score + 300
      this.refs.Header.incrementScore(300)
      this.forceUpdate()
      return
    }
    this.score = this.score + 200
    this.refs.Header.incrementScore(200)
    this.forceUpdate()
  }

  FindRightAnswer = () => {
    if(!this.isComponentMounted){
      return
    }

    if(this.QuestionSet[this.questionCount].type === "boolean"){
      if(this.QuestionSet[this.questionCount].correctAnswer == 0){
        this.refs.BC.refs.answerTrue.ChangeColor('green')
        return
      }
      this.refs.BC.refs.answerFalse.ChangeColor('green')
      return
    }

    if(this.QuestionSet[this.questionCount].correctAnswer == 0){
      this.refs.BC.refs.answerA.ChangeColor('green')
      return
    }
    if(this.QuestionSet[this.questionCount].correctAnswer == 1){
      this.refs.BC.refs.answerB.ChangeColor('green')
      return
    }
    if(this.QuestionSet[this.questionCount].correctAnswer == 2){
      this.refs.BC.refs.answerC.ChangeColor('green')
      return
    }
    this.refs.BC.refs.answerD.ChangeColor('green')
  }

  CalculateTimeBonus = () => {
    const timeLeftSeconds = this.timeLeft / 1000
    return Math.round(timeLeftSeconds * this.answeredCorrectly * this.answeredCorrectly)
  }

  ModalYesPressed = () => {
    this.onBackPressed()
    Actions.push('Game', {player: this.props.player})
  }

  ModalNoPressed = () => {
    this.onBackPressed()
  }

  render() {
    if(this.isLoadingQuestions) return(
      <ImageBackground source = {bgImage} style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <StatusBar hidden = {true} />
        <ActivityIndicator />
      </ImageBackground>
    )

    else return(
      <ImageBackground source = {bgImage} style = {styles.container}>
        <StatusBar hidden = {true} />

        <Header ref = "Header" time = {(this.timeLeft/1000).toPrecision(2)} />

        <QuestionContainer 
          ref = "QC" 
          questions = {this.QuestionSet}
        />

        <ButtonsContainer 
          ref = "BC" 
          questions = {this.QuestionSet}
          AnswerPressed = {this.onAnswerPressed}
          animationsFinished = {this.startTimer}
        />

        <Modal
          isOpen = {this.gameOver}
          position = "center" 
          style = {styles.modal}
          swipeToClose = {false}
          backdropPressToClose = {false}
        >
          <GameOverModal 
            ref = "gameOverModal"
            score = {this.score} 
            onYesPressed = {this.ModalYesPressed} 
            onNoPressed = {this.ModalNoPressed}
            timeBonus = {this.CalculateTimeBonus()}
          />
        </Modal>
        
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: ScreenHeight/15
  },

  modal: {
    height: ScreenHeight/3,
    width: ScreenWidth*0.9,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
})