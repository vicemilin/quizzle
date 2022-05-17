import React, {PureComponent} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import RF from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/FontAwesome'

import MenuButton from '../Components/MenuButton'

import { ButtonColorRed, ButtonColorGreen } from '../Constants/Colors'
import { ScreenHeight, ScreenWidth} from '../Constants/Screen'


export default class GameOverModal extends PureComponent {
  constructor(props){
    super(props)
    this.buttonsActive = false
    this.timeBonus = ""
    this.score = this.props.score

    this.btnNoPressed = this.btnNoPressed.bind(this)
    this.btnYesPressed = this.btnYesPressed.bind(this)
  }

  componentDidMount = () => {
    this.ShowTimeBonus()
  }

  ShowTimeBonus = () => {
    setTimeout(() =>{
      this.timeBonus = this.props.timeBonus.toString()
      this.forceUpdate()
      setTimeout(() => {
        this.buttonsActive = true
        this.score = this.score + Number.parseInt(this.timeBonus)
        this.forceUpdate()
      }, 500)
    },1000)
  }

  btnYesPressed = () => {
    if(!this.buttonsActive){
      return
    }

    this.props.onYesPressed()
  }

  btnNoPressed = () => {
    if(!this.buttonsActive){
      return
    }

    this.props.onNoPressed()
  }
  render(){
    return(
      <View style = {styles.background}>
        <View style = {styles.container}>
          <Text style = {styles.gameOverText}>Game Over!</Text>

          <Text style = {styles.scoreText}>Score: {this.score}</Text>
          <Text style = {styles.scoreText}>Time Bonus: {this.timeBonus}</Text>
          <Text style = {styles.gameOverText}>Play Again?</Text>

          <View style = {styles.buttonsContainer}>
            <MenuButton color = {ButtonColorRed} size = {0.3} elevation = {3} onPress = {this.btnNoPressed}>
              <Icon name = 'times'/>
            </MenuButton>

            <MenuButton color = {ButtonColorGreen} size = {0.3} elevation = {3} onPress = {this.btnYesPressed}> 
              <Icon name = 'check'/>
            </MenuButton>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000088', //ButtonColorRed["shadow"],
    width: ScreenWidth*0.75,
    height: ScreenHeight/3 + 3,
    borderRadius: 15,
  }, 

  container: {
    backgroundColor: 'blue', //ButtonColorRed["background"],
    width: ScreenWidth*0.75,
    height: ScreenHeight/3,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  gameOverText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: RF(3)
  },

  scoreText: {
    color: 'yellow',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: RF(3)
  },

  buttonsContainer:{
    flexDirection: 'row',
    width: ScreenWidth / 3,
    justifyContent: 'space-around'
  }
})
