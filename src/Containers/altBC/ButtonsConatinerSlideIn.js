import React, {Component} from 'react';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';

import Button from '../Components/Button';
import {ScreenWidth, ScreenHeight} from '../Constants/Screen'

export default class ButtonsContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      answerAPosition: new Animated.Value(2*ScreenWidth),
      answerBPosition: new Animated.Value(-2*ScreenWidth),
      answerCPosition: new Animated.Value(2*ScreenWidth),
      answerDPosition: new Animated.Value(-2*ScreenWidth),
    }
  }

  componentDidMount = () => {
    //this.AnimateAnswers();
  }

  AnimateAnswers = () => {
    Animated.timing(this.state.answerAPosition, {
      toValue: 0,
      easing: Easing.bounce,
      delay: 500,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.answerBPosition, {
      toValue: 0,
      easing: Easing.bounce,
      delay: 2500,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.answerCPosition, {
      toValue: 0,
      easing: Easing.bounce,
      delay: 4500,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.answerDPosition, {
      toValue: 0,
      easing: Easing.bounce,
      delay: 6500,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress = {this.AnimateAnswers}/>
        <Animated.View style={{ transform: [{translateX: this.state.answerAPosition}] }}>
          <Button />
        </Animated.View>
          
        <Animated.View style={{ transform: [{translateX: this.state.answerBPosition}] }}>
          <Button />
        </Animated.View>

        <Animated.View style={{ transform: [{translateX: this.state.answerCPosition}] }}>
          <Button />
        </Animated.View>

        <Animated.View style={{ transform: [{translateX: this.state.answerDPosition}] }}>
          <Button />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  buttonContainer: {
    width: ScreenWidth/1.5 + 10,
    height: ScreenHeight/12 + 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
