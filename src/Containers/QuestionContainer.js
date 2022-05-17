import React, {Component} from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import RF from 'react-native-responsive-fontsize'

import {ScreenWidth, ScreenHeight} from '../Constants/Screen'

import ElevatedView from '../Components/ElevatedView';
AnimatedElevatedView = Animated.createAnimatedComponent(ElevatedView)

export default class QuestionContainer extends Component{
  constructor(props){
    super(props)
    this.firstAnimationPosition = new Animated.Value(0)
    this.firstAnimationSpin = new Animated.Value(0)

    this.FirstAnimationTransform = { transform: [
      {
        translateX: this.firstAnimationPosition
      },
      {
        rotate: this.firstAnimationSpin.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg', '360deg']
        })
      }
    ]}

    this.animationPosition = new Animated.Value(0)
    this.spin = new Animated.Value(0)

    this.AnimationTransform = { transform: [
      {
        translateX: this.animationPosition
      },
      {
        rotate: this.spin.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg', '360deg']
        })
      }
    ]}
    
    this.state = {
      questionCounter: 1
    }

    this.isComponentMounted = true
  }

  AnimateFirst = () => {
    Animated.parallel([
      Animated.timing(
        this.firstAnimationPosition,
        {
          toValue: 500,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
  
      Animated.timing(
        this.firstAnimationSpin,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ]).start()
  }

  AnimateNext = () => {
    Animated.parallel([
      Animated.timing(
        this.animationPosition,
        {
          toValue: 500,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
  
      Animated.timing(
        this.spin,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ]).start(() => {
      if(!this.isComponentMounted){
        return
      }
      this.setState({questionCounter: this.state.questionCounter + 1})
      Animated.parallel([
        Animated.timing(
          this.animationPosition,
          {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
          }
        ),
    
        Animated.timing(
          this.spin,
          {
            toValue: 0,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: true
          }
        )
      ]).start()
    })
  }

  GoToNextQuestion = () => {
    /*if(this.state.questionCounter >= this.props.questions.length){
      return
    }*/
    this.AnimateNext()
  }

  componentWillUnmount = () => {
    this.isComponentMounted = false
    Animated.timing(this.firstAnimationPosition).stop()
    Animated.timing(this.firstAnimationSpin).stop()
    Animated.timing(this.animationPosition).stop()
    Animated.timing(this.spin).stop()
  }

  render(){
    const questionSet = this.props.questions
    return(
      <View>
        <ElevatedView style = {{transform: [{rotate: '5deg'}]}} />
        <ElevatedView style = {{position: 'absolute', transform: [{rotate: '-5deg'}]}} />

        <ElevatedView style = {styles.questionView}>
          <Text>Game Over!</Text>
        </ElevatedView>

        <ElevatedView style = {[styles.questionView]}>
          <View style = {styles.questionNumberView}>
            <Text>{(this.state.questionCounter + 1) + " / " + questionSet.length}</Text>
          </View>
          <View style = {styles.questionTextView}>
            {this.state.questionCounter < questionSet.length &&
            <Text style = {styles.questionText}>{questionSet[this.state.questionCounter].questionText}</Text>}
            {this.state.questionCounter >= questionSet.length &&
            <Text style = {styles.getReadyText}>Game Over!</Text>}
          </View>
        </ElevatedView>

        <AnimatedElevatedView style = {[styles.questionView, this.AnimationTransform]}>
          <View style = {styles.questionNumberView}>
            <Text>{this.state.questionCounter + " / " + questionSet.length}</Text>
          </View>
          <View style = {styles.questionTextView}>
          {this.state.questionCounter <= questionSet.length &&
          <Text style = {styles.questionText}>{questionSet[this.state.questionCounter - 1].questionText}</Text>}
          {this.state.questionCounter > questionSet.length &&
          <Text style = {styles.getReadyText}>Game Over!</Text>}
          </View>
        </AnimatedElevatedView>

        <AnimatedElevatedView style = {[styles.questionView, this.FirstAnimationTransform]}>
          <View style = {styles.getReadyView}>
            <Text style = {styles.getReadyText}>Get Ready!</Text>
          </View>
        </AnimatedElevatedView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  questionView: {
    position: 'absolute',
  },

  getReadyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  getReadyText: {
    fontSize: RF(5)
  },

  questionNumberView:{
    width: ScreenWidth*0.75,
    marginLeft: 5,
    marginBottom: 0,
  },

  questionTextView: {
    width: ScreenWidth*0.75,
    height: ScreenHeight/5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginTop: 0,
  },

  questionText: {
    fontSize: RF(3),
    textAlign: 'center',
  }
})