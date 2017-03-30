import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import Sound from 'react-native-sound'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

export default class Player extends Component {

  constructor(props) {
    super(props)

    Sound.setCategory('Playback')

    this.clip = null
    this.updateProgress = this.updateProgress.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
    this.loadClip = this.loadClip.bind(this)
    this.buttonImage = this.buttonImage.bind(this)
    this.progressBarWidth = this.progressBarWidth.bind(this)
    this.state = {
      playing: false,
      progress: 0,
      progressBackgroundWidth: 0
    }

    this.loadClip()
  }

  componentDidMount() {
    this.updateProgress()
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
        <View style={styles.topRow}>
          <TouchableHighlight onPress={this.togglePlaying} underlayColor='transparent'>
            <Image source={this.buttonImage()} style={styles.playButton}/>
          </TouchableHighlight>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.bottomRow} onLayout={(event) => {
          var {x, y, width, height} = event.nativeEvent.layout
          this.setState({
            progressBackgroundWidth: width
          })
        }}>
          <View style={{
            backgroundColor: 'white',
            height: 8,
            width: this.progressBarWidth()
          }}>
          </View>
        </View>
      </View>
    )
  }

  updateProgress() {
    if (this.clip) {
      this.clip.getCurrentTime((seconds) => {
        let progress = seconds / this.clip.getDuration()
        this.setState({ progress })
      })
    } else {
      this.setState({
        progress: 0
      })
    }
    this.setTimeout(
      this.updateProgress,
      500
    )
  }

  progressBarWidth() {
    return Math.round(this.state.progress * this.state.progressBackgroundWidth)
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
    flexDirection: 'column',
    backgroundColor: '#2299aa',
    padding: 12,
  },
  topRow: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bottomRow: {
    alignItems: 'center',
    backgroundColor: '#118899',
    flexDirection: 'row',
    height: 8,
    justifyContent: 'flex-start',
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

// Use react-mixin to allow mixins in ES6
reactMixin(Player.prototype, TimerMixin)
