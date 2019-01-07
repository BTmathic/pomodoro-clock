import React from 'react';
import ReactDOM from 'react-dom';

export default class Pomodoro extends React.Component {
  state = {
    timer: 1500,
    intervalTime: 25,
    breakTime: 5,
    onBreak: false,
    timerRunning: false,
    timerType: 'Work Interval',
    animationPlayState: 'paused',
    timerColour: '#BE8539'
  };

  setClock = (timer) => {
    const minutes = ('0' + Math.floor(timer/60)).slice(-2);
    const seconds = ('0' + (timer - minutes*60)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  handleToggleClock = () => {
    this.setState((prevState) => ({
      timerRunning: !prevState.timerRunning,
      animationPlayState: prevState.timerRunning ? 'paused' : 'running'
    }));
  };

  handleReset = () => {
    this.refs.audio.pause();
    this.refs.audio.currentTime = 0;
    this.setState(() => ({
      timer: 1500,
      intervalTime: 25,
      breakTime: 5,
      onBreak: false,
      timerRunning: false,
      timerType: 'Work Interval',
      animationPlayState: 'paused',
      timerColour: '#BE8539'
    }));
  };

  handleChangeTime = (e, change) => {
    if (!this.state.timerRunning) {
      const click = e.target.id.split('-');
      if (click[0] === 'session') {
        if ((this.state.intervalTime < 60 || change === -1) &&
          (this.state.intervalTime > 1 || change === 1)) {
          if (!this.state.onBreak) {
            this.setState((prevState) => ({
              intervalTime: prevState.intervalTime + change,
              timer: prevState.timer + change*60
            }));
          } else {
            this.setState((prevState) => ({
              intervalTime: prevState.intervalTime + change
            }));
          }
        }
      } else {
        if ((this.state.breakTime < 60 || change === -1) &&
          (this.state.breakTime > 1 || change === 1)) {
          if (this.state.onBreak) {
            this.setState((prevState) => ({
              breakTime: prevState.breakTime + change,
              timer: prevState.timer + 60*change
            }));
          } else {
            this.setState((prevState) => ({
              breakTime: prevState.breakTime + change
            }));
          }
        }
      }
    }
  };

  handleClock = () => {
    if (this.state.timer === 0) {
      this.refs.audio.play();
      if (this.state.onBreak) {
        this.setState((prevState) => ({
          timer: prevState.intervalTime*60+1,
          onBreak: false,
          timerType: 'Work Interval',
          timerColour: '#BE8539'
        }));
      } else {
        this.setState((prevState) => ({
          timer: prevState.breakTime*60+1,
          onBreak: true,
          timerType: 'Break Interval',
          timerColour: '#0898BA'
        }));
      }
    }
    this.setState((prevState) => ({ timer: prevState.timer - 1}))
  };

  initializeClock = () => {
    setTimeout(() => {
      if (this.state.timerRunning) {
        this.handleClock();
      }
      this.initializeClock();
    }, 1000);
  };

  componentWillMount() {
    this.initializeClock();
  };

  render() {
    return (
      <div id='container'>
        <audio // sourced from https://www.soundsjay.com
          id='beep'
          src='./beep.mp3'
          ref='audio'
        >
          Your browser does not support the audio element
        </audio>
        <div id='clock'>
          <div id='title'>
            Pomodoro Clock
          </div>
          <div id='timer-label'>
            {this.state.timerType}
          </div>
          <div id='time-display'>
            <span id='time-left'>
              {this.setClock(this.state.timer)}
            </span>
          </div>
          <div id='controls'>
            <div id='start_stop' onClick={this.handleToggleClock} >
              { this.state.timerRunning ? 'Stop' : 'Start' }
            </div>
            <div id='reset' onClick={() => {this.handleReset()}}>
              Reset
            </div>
          </div>
          <div id='seconds-wheel' style={{ background: this.state.timerColour }}>
            <div id='timer-bars' style={{ animationPlayState: this.state.animationPlayState }}>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
              <div className='ten-second-bar'></div>
              <div className='five-second-bar'></div>
            </div>
          </div>
          <div id='settings'>
            <div id='interval'>
              <p id='session-label'>Session</p>
              <div id='session-length'>
                {this.state.intervalTime}
              </div>
              <div className='adjust-buttons'>
                <div id='session-decrement' className='adjust-button'
                  onClick={(e) => { this.handleChangeTime(e, -1) }}
                >
                  -
                                </div>
                <div id='session-increment' className='adjust-button'
                  onClick={(e) => { this.handleChangeTime(e, 1) }}
                >
                  +
                                </div>
              </div>
            </div>
            <div id='break'>
              <p id='break-label'>Break</p>
              <div id='break-length'>
                {this.state.breakTime}
              </div>
              <div className='adjust-buttons'>
                <div id='break-decrement' className='adjust-button'
                  onClick={(e) => { this.handleChangeTime(e, -1) }}
                >
                  -
                                </div>
                <div id='break-increment' className='adjust-button'
                  onClick={(e) => { this.handleChangeTime(e, 1) }}
                >
                  +
                                </div>
              </div>
            </div>
          </div>
          <div id='clock-footer'>
            <p>
              <a href='https://en.wikipedia.org/wiki/Pomodoro_Technique'
                target="_blank" rel="noopener noreferrer" title="Learn about how to use this clock"
              >
                Click here to learn more about how to use this clock and the Pomodoro Technique
                        </a>
            </p>
          </div>
        </div>
        <div id='photo-credit'>
          <a href="https://unsplash.com/@taylorleopold?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
            target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Taylor Leopold">
            Photo by Taylor Leopold
                    </a>
        </div>
      </div>
    );
  };
};