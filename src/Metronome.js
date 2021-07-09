import React, { Component } from 'react';
import './Metronome.css';
import tick from './Audio/Tick.mp3';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.timer = 0;
    this.audio = new Audio(tick);

    this.handleClick = this.handleClick.bind(this);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playing){
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  }

  handleClick() {
    if(this.state.playing){
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else{
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }

  }

  playClick () {
    //const{count, beatsPerMeasure} = this.state;

    const audio = new Audio(tick);
    audio.play();

    // this.setState({
    //   count: (this.count+1) % this.beatsPerMeasure
    // });
  }

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.handleClick}>
          {this.state.playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Metronome;