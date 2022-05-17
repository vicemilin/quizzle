import React, {Component} from 'react';
import { StyleSheet, View, Animated, Easing, Text } from 'react-native'

import MyAwesomeButton from '../Components/MyAwesomeButton'

import {ScreenWidth, ScreenHeight} from '../Constants/Screen'
import {questionPopInAnimation, questionPopOutAnimation, questionChangeAnimationLenght} from '../Constants/Timing'

export default class ButtonsContainer extends Component{
  constructor(props){
    super(props)
    this.state = {  
      buttonsDisabled: true,
      questionCounter: 0
    }

    this.AnswerAPressed = this.AnswerAPressed.bind(this)
    this.AnswerBPressed = this.AnswerBPressed.bind(this)
    this.AnswerCPressed = this.AnswerCPressed.bind(this)
    this.AnswerDPressed = this.AnswerDPressed.bind(this)

    this.AnswerTruePressed = this.AnswerTruePressed.bind(this)
    this.AnswerFalsePressed = this.AnswerFalsePressed.bind(this)
  }

  ShowAnswers = () => {
    if(this.props.questions[this.state.questionCounter].type === "multiple"){
      this.refs.answerA.ShowAnswer()
      this.refs.answerB.ShowAnswer(300)
      this.refs.answerC.ShowAnswer(600)
      this.refs.answerD.ShowAnswer(900, this.AnimationsEnded)
    }
    else{
      this.refs.answerTrue.ShowAnswer()
      this.refs.answerFalse.ShowAnswer(100, this.AnimationsEnded)

    }
  }

  AnimationsEnded = () => {
    this.EnableButtons()
    this.props.animationsFinished()
  }

  EnableButtons = () => {
    this.setState({buttonsDisabled: false})
  }

  DisableButtons = () => {
    this.setState({buttonsDisabled: true})
  }

  HideAnswers = () => {
    if(this.props.questions[this.state.questionCounter].type === "multiple"){
      this.refs.answerA.HideAnswer()
      this.refs.answerB.HideAnswer()
      this.refs.answerC.HideAnswer()
      this.refs.answerD.HideAnswer()
    }
    else{
      this.refs.answerTrue.HideAnswer()
      this.refs.answerFalse.HideAnswer()
    }
  }

  GoToNextQuestion = () => {
    if(this.state.questionCounter >= this.props.questions.length - 1){
      return
    }
    setTimeout(()=>{this.ShowAnswers()},questionChangeAnimationLenght + 500)
    this.setState({questionCounter: this.state.questionCounter + 1})
    this.forceUpdate()
    this.ResetColors()
    this.HideAnswers()
  }

  ResetColors = () => {
    if(this.props.questions[this.state.questionCounter].type === "multiple"){
      this.refs.answerA.ChangeColor('white')
      this.refs.answerB.ChangeColor('white')
      this.refs.answerC.ChangeColor('white')
      this.refs.answerD.ChangeColor('white')
    }
    else{
      this.refs.answerTrue.ChangeColor('white')
      this.refs.answerFalse.ChangeColor('white')
    }
  }

  AnswerAPressed = () => {
    if(this.state.buttonsDisabled){return}
    this.DisableButtons()
    if(this.props.questions[this.state.questionCounter].correctAnswer == 0){
      this.refs.answerA.ChangeColor('green')
      this.props.AnswerPressed(true)
      return
    }
    this.refs.answerA.ChangeColor('red')
    this.props.AnswerPressed(false)
  }

  AnswerBPressed = () => {
    if(this.state.buttonsDisabled){return}
    this.DisableButtons()
    if(this.props.questions[this.state.questionCounter].correctAnswer == 1){
      this.refs.answerB.ChangeColor('green')
      this.props.AnswerPressed(true)
      return
    }
    this.refs.answerB.ChangeColor('red')
    this.props.AnswerPressed(false)
  }

  AnswerCPressed = () => {
    if(this.state.buttonsDisabled){return}
    this.DisableButtons()
    if(this.props.questions[this.state.questionCounter].correctAnswer == 2){
      this.refs.answerC.ChangeColor('green')
      this.props.AnswerPressed(true)
      return
    }
    this.refs.answerC.ChangeColor('red')
    this.props.AnswerPressed(false)
  }

  AnswerDPressed = () => {
    if(this.state.buttonsDisabled){return}
    this.DisableButtons()
    if(this.props.questions[this.state.questionCounter].correctAnswer == 3){
      this.refs.answerD.ChangeColor('green')
      this.props.AnswerPressed(true)
      return
    }
    this.refs.answerD.ChangeColor('red')
    this.props.AnswerPressed(false)
  }

  AnswerTruePressed = () => {
    if(this.state.buttonsDisabled){return}
    this.DisableButtons()
    if(this.props.questions[this.state.questionCounter].correctAnswer == 0){
      this.refs.answerTrue.ChangeColor('green')
      this.props.AnswerPressed(true)
      return
    }
    this.refs.answerTrue.ChangeColor('red')
    this.props.AnswerPressed(false)
  }

  AnswerFalsePressed = () => {
    if(this.state.buttonsDisabled){return}
    this.DisableButtons()
    if(this.props.questions[this.state.questionCounter].correctAnswer == 1){
      this.refs.answerFalse.ChangeColor('green')
      this.props.AnswerPressed(true)
      return
    }
    this.refs.answerFalse.ChangeColor('red')
    this.props.AnswerPressed(false)
  }

  render() {
    const question = this.props.questions[this.state.questionCounter]
    if(question.type === "multiple"){
      return (
        <View style={styles.container}>
          <MyAwesomeButton 
            disabled = {this.state.buttonsDisabled} 
            onPress = {this.AnswerAPressed}
            answer = {question.answers[0]}
            ref = "answerA"
          />

          <MyAwesomeButton 
            disabled = {this.state.buttonsDisabled}
            onPress = {this.AnswerBPressed}
            answer = {question.answers[1]}
            ref = "answerB"
          />

          <MyAwesomeButton 
            disabled = {this.state.buttonsDisabled}
            onPress = {this.AnswerCPressed}
            answer = {question.answers[2]}
            ref = "answerC"
          />

          <MyAwesomeButton 
            disabled = {this.state.buttonsDisabled}
            onPress = {this.AnswerDPressed}
            answer = {question.answers[3]}
            ref = "answerD"
          />
        </View>
      );
    }
    else{
      return(
        <View style = {styles.container}>
          <MyAwesomeButton 
            disabled = {this.state.buttonsDisabled} 
            onPress = {this.AnswerTruePressed}
            answer = {question.answers[0]}
            ref = "answerTrue"
          />

          <MyAwesomeButton 
            disabled = {this.state.buttonsDisabled}
            onPress = {this.AnswerFalsePressed}
            answer = {question.answers[1]}
            ref = "answerFalse"
          />

          <View style = {styles.emptyPlaceHolders}></View>
          <View style = {styles.emptyPlaceHolders}></View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth*0.75,
    height: ScreenHeight/2.2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  emptyPlaceHolders: {
    width: ScreenWidth/1.5,
    height: ScreenHeight/12,
  }

});
