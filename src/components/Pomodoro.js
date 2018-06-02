import React from 'react';
import ReactDOM from 'react-dom';

export default class Pomodoro extends React.Component {
    state = {
        timerMinutes: 25,
        timerSeconds: '00',
        intervalTime: 25,
        breakTime: 5,
        onBreak: false,
        timerRunning: false,
        timerType: 'Work Interval',
        animationPlayState: 'paused',
        timerColour: '#BE8539'
    };

    handleToggleClock = () => {
        this.setState((prevState) => ({
            timerRunning: !prevState.timerRunning,
            animationPlayState: prevState.timerRunning ? 'paused' : 'running'
        }));
    };

    handleChangeTime = (e, change) => {
        const click = e.target.id.split('-');
        if (click[1] === 'interval') {
            if ((this.state.intervalTime < 99 || change === -1) && 
                (this.state.intervalTime > 1 || change === 1)) {
                if (!this.state.onBreak) {
                    this.setState((prevState) => ({
                        intervalTime: prevState.intervalTime + change,
                        timerMinutes: prevState.intervalTime + change,
                        timerSeconds: '00'
                    }));
                } else {
                    this.setState((prevState) => ({
                        intervalTime: prevState.intervalTime + change
                    }));
                }
            }
        } else {
            if ((this.state.breakTime < 99 || change === -1) && 
                (this.state.breakTime > 1 || change === 1)) {
                if (this.state.onBreak) {
                    this.setState((prevState) => ({
                        breakTime: prevState.breakTime + change,
                        timerMinutes: prevState.breakTime + change,
                        timerSeconds: '00'
                    }));
                } else {
                    this.setState((prevState) => ({
                        breakTime: prevState.breakTime + change
                    }));
                }
            }
        }
    };

    handleClock = () => {
        if (this.state.timerMinutes === 0 && this.state.timerSeconds === '00') {
            if (this.state.onBreak) {
                this.setState(() => ({
                    timerMinutes: this.state.intervalTime,
                    timerSeconds: '01',
                    onBreak: false,
                    timerType: 'Work Interval',
                    timerColour: '#BE8539'
                }));
            } else {
                this.setState(() => ({
                    timerMinutes: this.state.breakTime,
                    timerSeconds: '01',
                    onBreak: true,
                    timerType: 'Break Interval',
                    timerColour: '#0898BA'
                }));
            }
        }

        const timerSeconds = this.state.timerSeconds;
        if (timerSeconds === '00') {
            this.setState((prevState) => ({
                timerMinutes: prevState.timerMinutes - 1,
                timerSeconds: 59
            }));
        } else if (timerSeconds === 11 ) {
            this.setState(() => ({
                timerSeconds: '10'
            }));
        } else if (typeof timerSeconds === 'string') {
            this.setState((prevState) => ({
                timerSeconds: '0' + (parseInt(prevState.timerSeconds) - 1)
            }))
        } else {
            this.setState((prevState) => ({
                timerSeconds: prevState.timerSeconds - 1
            }));
        }
    }

    initializeClock = () => {
        setTimeout(() => {
            if (this.state.timerRunning) {
                this.handleClock();
            }
            this.initializeClock();
        }, 1000);
    }

    componentWillMount() {
        this.initializeClock();
    }

    render() {
        return (
            <div id='container'>
                
                <div id='clock'>
                    <div id='title'>
                        Pomodoro Clock
                    </div>
                    <div id='timer-type'>
                        {this.state.timerType}
                    </div>
                    <div id='time-display'>
                        <span id='time' onClick={this.handleToggleClock}>
                            <span id='minutes'>{this.state.timerMinutes}</span>:
                            <span id='seconds'>{this.state.timerSeconds}</span>
                        </span>
                    </div>
                    <div id='seconds-wheel' style={{ background: this.state.timerColour }}>
                        <div id='timer-bars' style={{ animationPlayState: this.state.animationPlayState}}>
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
                            <div id='interval-time'>
                                {this.state.intervalTime}
                            </div>
                            <div className='adjust-buttons'>
                                <div id='decrease-interval' className='adjust-button'
                                    onClick={(e) => {this.handleChangeTime(e, -1)}}
                                >
                                    -
                                </div>
                                <div id='increase-interval' className='adjust-button'
                                    onClick={(e) => {this.handleChangeTime(e, 1)}}
                                >
                                    +
                                </div>
                            </div>
                        </div>
                        <div id='break'>
                            <div id='break-time'>
                                {this.state.breakTime}
                            </div>
                            <div className='adjust-buttons'>
                                <div id='decrease-break' className='adjust-button'
                                    onClick={(e) => {this.handleChangeTime(e, -1)}}
                                >
                                    -
                                </div>
                                <div id='increase-break' className='adjust-button'
                                    onClick={(e) => {this.handleChangeTime(e, 1)}}
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