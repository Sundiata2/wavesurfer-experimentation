import React, {useState, useEffect} from 'react';
import { PacmanLoader } from 'react-spinners';
const WaveSurfer = require("wavesurfer.js");

class WaveSurf extends React.Component<{
  path?: string,
  color?: string
},{
  isPlaying?: boolean,
  wavesurfer?: any,
  ready?: boolean,
  currentTime?: number,
  duration?: number
}> {

  constructor(props:any) {
    super(props);

    this.state = {
      isPlaying: false,
      wavesurfer: null,
      ready: false,
      currentTime: 0,
      duration: 0
    };
  }

  public componentDidMount() {
    const { path, color } = this.props;
    this.setupSurfer();
  }

  public componentWillUnmount() {
    // destroy wavesurfer here
    const { wavesurfer } = this.state;
    if (wavesurfer) {
      wavesurfer.destroy();
    }
  }

  public setupSurfer() {
    // Set up wavesurfer instance and methods here
    const wavesurfer = WaveSurfer.create({
      container: document.getElementById('waveform-container'),
      waveColor: 'violet',
      progressColor: 'purple'
    });

    wavesurfer.load(`${process.env.PUBLIC_URL}/audio/waitin.mp3`);

    wavesurfer.on('ready', () => {
      const duration = Number(wavesurfer.getDuration());
      const formatted = Math.floor(duration);
      this.setState({ready: true, duration: formatted}), () => {
        wavesurfer.play();
      }
    });

    wavesurfer.on('audioprocess', () => {
      this.setState({
        currentTime: Math.floor(Number(wavesurfer.getCurrentTime()))
      });
    });

    this.setState({
      wavesurfer
    });
  }

  public play() {
    const { wavesurfer, ready } = this.state;
    if (ready) {
      wavesurfer.play();
    }
  }

  public pause() {
    const {wavesurfer} = this.state;
    wavesurfer.pause();
  }

  public fetchWaveform(waveformURL: string) {
    // This is for later, for now use local audio file and get functionality going
  }

  public renderWaveSurfer() {
    const {ready, wavesurfer} = this.state;
    if (!ready) {
      return (
        <div id="waveform-container" style={{width: '500px'}}>
          <PacmanLoader loading={true} color={'#D736D3'} sizeUnit="px" size={80}/>
        </div>
      );
    }
    return (
      <div id="waveform-container" style={{width: '500px'}}>
      </div>
    );
  }

  public render() {
    const {ready} = this.state;
    return (
      <div>
        {this.renderWaveSurfer()}
        <div onClick={this.play.bind(this)} style={{cursor: 'pointer'}}>{'Play'}</div>
        <div onClick={this.pause.bind(this)} style={{cursor: 'pointer'}}>{'Pause'}</div>
        <div>{this.state.currentTime}</div>
        <div>{this.state.duration}</div>
      </div>
    );
  }
}

export default WaveSurf;
