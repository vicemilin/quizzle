import React, {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

import { ScreenWidth, ScreenHeight } from '../Constants/Screen'

export default class ElevatedView extends PureComponent{
  static propTypes = {
    elevation: PropTypes.number
  }

  static defaultProps = {
    elevation: 3
  }

  constructor(props){
    super(props)
  }

  render() {
    const elevation = this.props.elevation
    return(
      <View style = {[{
        backgroundColor: '#AAAAAA',
        width: ScreenWidth*0.75,
        height: ScreenHeight/4 + elevation,
        borderRadius: 15,
      }, this.props.style]}>
        <View style = {styles.container}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: ScreenWidth*0.75,
    height: ScreenHeight/4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#AAAAAA'
  }
})