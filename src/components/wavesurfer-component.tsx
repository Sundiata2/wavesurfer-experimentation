import React, {useState, useEffect} from 'react';
const WaveSurfer = require("wavesurfer.js");

class WaveSurf extends React.Component<{
  path?: string,
  color?: string
},{
  isPlaying?: boolean,
  waveformSVG?: any,
  wavesurfer?: any,
  ready?: boolean
}> {

  constructor(props:any) {
    super(props);

    this.state = {
      isPlaying: false,
      waveformSVG: null,
      wavesurfer: null,
      ready: false
    };
  }

  public componentDidMount() {
    const { path, color } = this.props;
    const { waveformSVG } = this.state;
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
      this.setState({ready: true}), () => {
        wavesurfer.play();
      }
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
    return (
      <div id="waveform-container" style={{width: '500px'}}>
      </div>
    );
  }

  public render() {
    return (
      <div>
        {this.renderWaveSurfer()}
        <div onClick={this.play.bind(this)} style={{cursor: 'pointer'}}>{'Play'}</div>
        <div onClick={this.pause.bind(this)} style={{cursor: 'pointer'}}>{'Pause'}</div>
      </div>
    );
  }
}

export default WaveSurf;
