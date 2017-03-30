import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'
import Home from './Home'

export default class AudioPlayer extends Component {
  render() {
    return (
      <Home />
    )
  }
}

AppRegistry.registerComponent('AudioPlayer', () => AudioPlayer)
