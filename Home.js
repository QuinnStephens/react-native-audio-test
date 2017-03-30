import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Player from './Player'

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.setSong = this.setSong.bind(this)
    this.state = {
      url: null,
      title: ""
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.choices}>
          <TouchableHighlight onPress={() => this.setSong("tblister.mp3", "Blissed, Or In the Sun")}>
            <Text>
              Blissed, Or In the Sun
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setSong("tistanbul.mp3", "It's Stan Bool")}>
            <Text>
              It's Stan Bool
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setSong("tsanteria.mp3", "Santa Rhea")}>
            <Text>
              Santa Rhea
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.player}>
          <Player 
            url={this.state.url}
            title={this.state.title}
            />
          </View>
      </View>
    )
  }

  setSong(url, title) {
    this.setState({
      url: url,
      title: title
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  choices: {
    alignItems: 'center',
    height: 128,
    justifyContent: 'space-between',
    margin: 64,
  },
  player: {
    height: 128,
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
