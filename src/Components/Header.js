import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { ScreenWidth, ScreenHeight } from '../Constants/Screen'
import RF from 'react-native-responsive-fontsize';

export default class Header extends PureComponent{
  constructor(props){
    super(props)
    this.score = 0
    this.scoreIncrement = ''
  }
  
  incrementScore = (score) => {
    this.scoreIncrement = ' +' + score.toString()
    this.forceUpdate()

    setTimeout(() => {
      this.score += score
      this.scoreIncrement = ''
      this.forceUpdate()
    }, 1500)
  }

  render(){
    return(
      <View style = {styles.container}>

        <View style = {styles.quitContainer}>
          <Icon name = 'chevron-left' style = {styles.scoreText} iconSize = {30}/>
        </View>

        <View style = {styles.scoreContainer}>
          <Text style = {styles.scoreText}>
            {this.score}
          </Text>
          <View style = {{width: ScreenWidth / 8}}>
            <Text style = {{color: 'green', fontSize: RF(3)}}>{this.scoreIncrement}</Text>
          </View>
        </View>

        <View style = {styles.timeContainer}>
          <Text style = {styles.timeText}>
            {this.props.time}"
          </Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: ScreenWidth,
    height: ScreenHeight/15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },

  scoreContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: ScreenWidth/2,
    left: ScreenWidth/4 + ScreenWidth/16,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scoreText:{
    color: 'white',
    fontSize: RF(3),
  },


  timeContainer: {

  },

  timeText: {
    color: 'white',
    fontSize: RF(7)
  },


  quitContainer: {

  },

  quitText: {
    color: 'white',
    fontSize: RF(3)
  }
})