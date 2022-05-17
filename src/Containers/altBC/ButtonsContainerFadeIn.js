import React, {Component} from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

import Button from '../Components/Button';
import {ScreenWidth, ScreenHeight} from '../Constants/Screen'

export default class ButtonsContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      answerAOpacity: new Animated.Value(0),
      answerBOpacity: new Animated.Value(0),
      answerCOpacity: new Animated.Value(0),
      answerDOpacity: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    //this.AnimateAnswers();
  }

  AnimateAnswers = () => {
    Animated.timing(this.state.answerAOpacity, {
      toValue: 1,
      easing: Easing.ease,
      delay: 500,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.answerBOpacity, {
      toValue: 1,
      easing: Easing.ease,
      delay: 2500,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.answerCOpacity, {
      toValue: 1,
      easing: Easing.ease,
      delay: 4500,
      duration: 2000,
      useNativeDriver: true
    }).start();

    Animated.timing(this.state.answerDOpacity, {
      toValue: 1,
      easing: Easing.ease,
      delay: 6500,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }
  render() {
    return (
      <View style={styles.container}>
        <Button onPress = {this.AnimateAnswers}/>
        <Animated.View style={{opacity: this.state.answerAOpacity}} >
          <Button />
        </Animated.View>
          
        <Animated.View style={{opacity: this.state.answerBOpacity}}>
          <Button />
        </Animated.View>

        <Animated.View style={{opacity: this.state.answerCOpacity}}>
          <Button />
        </Animated.View>

        <Animated.View style={{opacity: this.state.answerDOpacity}}>
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
