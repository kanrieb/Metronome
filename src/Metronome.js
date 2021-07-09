import React, { Component } from 'react';
import './Metronome.css';
import tick from './Audio/Tick.mp3';


//Ideas: 
//Include Time signature
//Have different audios?
//Time signature
//Sound only on specific beats (emphasis on first beat)
//Customize BPM range
//have an animation?


class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      prevCount: 0,
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
      this.timer = setInterval(this.playClick.bind(this), (60 / bpm) * 1000);

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
      this.timer = setInterval(this.playClick.bind(this), (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }

  }

  playClick() {
    this.audio.play();

    this.setState({
      prevCount: this.state.count,
      count: (this.state.count+1) % this.state.beatsPerMeasure
    });

  }

  render() {
    const { playing, bpm } = this.state;

    var circles = [];
    for(var i=0;i<this.state.beatsPerMeasure;i++){
      if(this.state.playing === true & i === this.state.prevCount){
        circles.push(
          (<div id="'+i+'" className="filled cell"></div>)
        );  
      } else{
        circles.push(
            (<div id="'+i+'" className="circle cell"></div>)
        );  
      }
  }

    return (
      <div className="metronome">
        <div className="dots">
          {circles}
        </div>
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