import React, {Component} from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native'

import { LoadCategoryList, LoadToken, LoadPlayerQuestionsLeft } from './src/API/TriviaDB/InitialLoad'
import { ReadCategories, ReadScores, IsFirstUse } from './src/API/Storage'

import { CategoryList, getCategoryById } from './src/Classes/Category'
import Player from './src/Classes/Player'
import {Routes, RoutesFirstUse} from './src/Screens/Routes'

export default class App extends Component {
  constructor(props){
    super(props)
    this.categoriesLoaded = false
    this.storageLoaded = false
    this.firstUseLoaded = false
    this.firstUse = false
    this.player = new Player()
  }
  componentDidMount = async () => {
    IsFirstUse(this.FirstUse, this.StartApp)
    LoadCategoryList(() => {
      LoadToken((token)=>{
        this.categoriesLoaded = true
        this.player.token = token
        this.player.chosenCategories = CategoryList.slice() 

        ReadCategories(this.player, () => {
          ReadScores(this.player, () =>{
            this.player.chosenCategories = this.player.chosenCategories.map(id => getCategoryById(id))
            this.storageLoaded = true
            this.forceUpdate()
          })
        })

        LoadPlayerQuestionsLeft(this.player)
        this.forceUpdate()
      }, (error)=>{
        alert("Failed to get token: " + error.toString())
      })
    }, (error) => {
      alert("Failed to connect to database: " + error.toString())
    })
  }

  StartApp = () => {
    this.firstUseLoaded = true
    this.firstUse = false
  }

  FirstUse = () => {
    this.firstUseLoaded = true
    this.firstUse = true
  }

  render() {
    if(this.firstUseLoaded && this.categoriesLoaded && this.storageLoaded){
      if(!this.firstUse){
        return(
          <Routes player = {this.player} />
        )
      }
      else{
        return(
          <RoutesFirstUse player = {this.player}/>
        )
      }
    }
    else{
      return(
        <View style = {{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <StatusBar hidden = {true} />
          <ActivityIndicator />
        </View>
      )
    }
  }
}
