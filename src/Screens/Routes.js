import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'

import Game from './Game'
import GameMenu from './GameMenu'
import MainMenu from './MainMenu'
import ChooseCategories from './ChooseCategories'

import Welcome from './FirstUse/Welcome'
import HelpGame from './FirstUse/HelpGame'
import HelpGameMenu from './FirstUse/HelpGameMenu'
import HelpMainMenu from './FirstUse/HelpMainMenu'

const Routes = (props) => (
  <Router>
    <Stack key = 'root'>
    
      <Scene 
        key = 'MainMenu' 
        initial = {true} 
        component = {MainMenu} 
        hideNavBar = {true} 
        player = {props.player} 
      />

      <Scene 
        key = 'GameMenu' 
        component = {GameMenu} 
        hideNavBar = {true} 
      />

      <Scene 
        key = 'Game' 
        component = {Game} 
        hideNavBar = {true} 
      />
      
      <Scene 
        key = 'ChooseCategories' 
        component = {ChooseCategories} 
        hideNavBar = {true} 
      />

    </Stack>
  </Router>
)

const RoutesFirstUse = (props) => (
  <Router>
    <Stack key = 'root'>
      <Scene 
        key = 'Welcome'
        initial = {true}
        component = {Welcome}
        hideNavBar = {true}
        player = {props.player}
      />

      <Scene 
        key = 'HelpGame'
        component = {HelpGame}
        hideNavBar = {true}
      />

      <Scene 
        key = 'HelpGameMenu'
        component = {HelpGameMenu}
        hideNavBar = {true}
      />


      <Scene 
        key = 'HelpMainMenu'
        component = {HelpMainMenu}
        hideNavBar = {true}
      />
      
      <Scene 
        key = 'ChooseCategories' 
        component = {ChooseCategories} 
        hideNavBar = {true} 
      />

    </Stack>
  </Router>
)

export { Routes, RoutesFirstUse }