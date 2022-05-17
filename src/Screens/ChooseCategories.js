import React, {Component} from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, ScrollView, Image, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { WriteCategories } from '../API/Storage'

import {ScreenWidth, ScreenHeight, bgImage} from '../Constants/Screen'
import {ButtonColorWhite, ButtonColorGreen, ButtonColorRed} from '../Constants/Colors'
import {CategoryList} from '../Classes/Category'

import MenuButton from '../Components/MenuButton'

import CategoryContainer from '../Containers/CategoryContainer'


export default class ChooseCategories extends Component{
  constructor(props){
    super(props)
    this.CategoryListThrees = this.splitCategoryListIntoThrees()
    this.categoryPressed = this.categoryPressed.bind(this)
    this.colors = new Array(CategoryList.length).fill(ButtonColorWhite)
    this.refsCollection = {}
    this.firstUse = this.props.firstUse ? true : false
    if(this.firstUse){
      this.props.player.chosenCategories.length = 0
    }

    this.onBackPressed = this.onBackPressed.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.unselectAll = this.unselectAll.bind(this)
    BackHandler.addEventListener("hardwareBackPress", this.onBackPressed)
  }

  componentDidMount(){
    CategoryList.forEach(c => {
      if(this.props.player.isChosenCategory(c.id) >= 0){
        this.colors[c.id - 9] = ButtonColorGreen
      }
    });
    this.forceUpdate()
  }

  onBackPressed = async () => {
    await WriteCategories(this.props.player, () => {})
    if(this.firstUse){
      Actions.push('Welcome', {finished: true, player: this.props.player})
      return true
    }
    Actions.pop()
    return true
  }

  splitCategoryListIntoThrees = () => {
    const CLThrees = []
    for(let i = 0; i < CategoryList.length / 3; i++){
      const temp = []
      for(let j = 0; j < 3; j++){
        temp.push(CategoryList[3*i + j])
      }
      CLThrees.push(temp)
    }
    return CLThrees
  }

  categoryPressed = (id) => () => {
    const index = this.props.player.isChosenCategory(id)
    if(index >= 0){
      this.props.player.chosenCategories.splice(index, 1)
      this.colors[id - 9] = ButtonColorWhite
    }
    else{
      this.props.player.chosenCategories.push(CategoryList[id - 9])
      this.colors[id - 9] = ButtonColorGreen
    }

    this.forceUpdate()
  }

  selectAll = () => {
    CategoryList.forEach((item) => {
      const index = this.props.player.isChosenCategory(item.id)
      if(index < 0){
        this.props.player.chosenCategories.push(CategoryList[item.id - 9])
        this.colors[item.id - 9] = ButtonColorGreen
        this.refsCollection[item.id].AnimatePush()
        this.forceUpdate()
      }
    })
  }

  unselectAll = () => {
    CategoryList.forEach((item) => {
      const index = this.props.player.isChosenCategory(item.id)
      if(index >= 0){
        this.props.player.chosenCategories.splice(index, 1)
        this.colors[item.id - 9] = ButtonColorWhite
        this.refsCollection[item.id].AnimateRelease()
        this.forceUpdate()
      }
    })
  }

  render() {
    return(
      <ImageBackground style = {styles.container} source = {bgImage}>
        <StatusBar hidden = {true}/>
        <ScrollView style = {{width: ScreenWidth}}>
          {
            this.CategoryListThrees.map((item, index) => {
              const marginBottom = index == 7 ? ScreenHeight / 8 : 0
              return(
                <View key = {index} style = {[styles.categoryRow, {marginBottom: marginBottom}]}>
                  <CategoryContainer
                    ref = {(instance) => {this.refsCollection[item[0].id] = instance}}
                    color = {this.colors[index * 3 + 0]} 
                    onPress = {this.categoryPressed(item[0].id)} 
                    category = {item[0]}
                    isChosen = {this.props.player.isChosenCategory(item[0].id) >= 0}
                  />

                  <CategoryContainer 
                    ref = {(instance) => {this.refsCollection[item[1].id] = instance}}
                    color = {this.colors[index * 3 + 1]} 
                    onPress = {this.categoryPressed(item[1].id)} 
                    category = {item[1]} 
                    isChosen = {this.props.player.isChosenCategory(item[1].id) >= 0}
                  />

                  <CategoryContainer 
                    ref = {(instance) => {this.refsCollection[item[2].id] = instance}}
                    color = {this.colors[index * 3 + 2]} 
                    onPress = {this.categoryPressed(item[2].id)} 
                    category = {item[2]}
                    isChosen = {this.props.player.isChosenCategory(item[2].id) >= 0}
                  />
                </View>
              )
            })
          }
        </ScrollView>
        {/*<View style = {styles.buttonsContainer}>*/}

        <View style = {styles.buttonUnSelectContainer}>
          <MenuButton color = {ButtonColorRed} size = {0.3} elevation = {3} onPress = {this.unselectAll}>
            <Icon name = 'times'/>
          </MenuButton>
        </View>

        <View style = {styles.buttonReadyContainer}>
          <MenuButton size = {0.45} color = {ButtonColorWhite} elevation = {5} onPress = {this.onBackPressed}>
            <Text>Ready</Text>
          </MenuButton>
        </View>

        <View style = {styles.buttonSelectContainer}>
          <MenuButton color = {ButtonColorGreen} size = {0.3} elevation = {3} onPress = {this.selectAll}> 
            <Icon name = 'check'/>
          </MenuButton>
        </View>

        {/*</View>*/}
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    alignItems: 'center'
  },

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  /*buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: ScreenWidth,
    height: ScreenHeight/10,
  }*/
  buttonSelectContainer: {
    position: 'absolute',
    top: ScreenHeight - ScreenHeight/20 - ScreenWidth/7 * 0.3,
    right: ScreenWidth/10
  },
  buttonUnSelectContainer: {
    position: 'absolute',
    top: ScreenHeight - ScreenHeight/20 - ScreenWidth/7 * 0.3,
    left: ScreenWidth/10
  },
  buttonReadyContainer: {
    position: 'absolute',
    top: ScreenHeight - ScreenHeight/20 - ScreenWidth/7 * 0.45,
    left: ScreenWidth/2 - ScreenWidth/7 * 0.45
  },
})