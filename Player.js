import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Sound from 'react-native-sound'

export default class Player extends Component {

  constructor(props) {
    super(props)

    Sound.setCategory('Playback')

    this.clip = null
    this.togglePlaying = this.togglePlaying.bind(this)
    this.loadClip = this.loadClip.bind(this)
    this.buttonImage = this.buttonImage.bind(this)
    this.state = {
      playing: false
    }

    this.loadClip()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      playing: false
    })
    if (this.clip) {
      this.clip.stop()
      this.clip.release()
    }
    this.loadClip(nextProps.url)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.togglePlaying}>
          <Image source={this.buttonImage()} style={styles.playButton}/>
        </TouchableHighlight>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </View>
    )
  }

  buttonImage() {
    return this.state.playing ? require('./pause.png') : require('./play.png')
  }

  togglePlaying() {
    if (!this.clip) {
      return
    }

    this.setState({
      playing: !this.state.playing
    })

    if (this.state.playing) {
      this.clip.pause()
    } else {
      this.clip.play()
    }
  }

  loadClip(url) {
    if (!url) { return }

    this.clip = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        alert(error.message)
        return
      }

      console.log('Successfully loaded song! Duration in seconds: ' + this.clip.getDuration() + '. Number of channels: ' + this.clip.getNumberOfChannels());
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#2299aa',
    padding: 24,
  },
  playButton: {
    height: 64,
    width: 64,
  },
  title: {
    color: 'white',
    flex: 1,
    fontSize: 22,
    padding: 24,
  },
})
