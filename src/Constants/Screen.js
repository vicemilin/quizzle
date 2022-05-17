import {Dimensions} from 'react-native'

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const bgImage = require('../Assets/background.jpeg')

export {ScreenWidth, ScreenHeight, bgImage}