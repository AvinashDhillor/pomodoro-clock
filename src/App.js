import React, { Component } from "react";
import { delay } from "q";

const DEFAULT_SESSION_TIME = 25;
const DEFAULT_BREAK_TIME = 5;
const SESSION = "Session";
const BREAK = "Break";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionValue: DEFAULT_SESSION_TIME,
      breakValue: DEFAULT_BREAK_TIME,
      currentProcess: SESSION,
      timeInMinutes: DEFAULT_SESSION_TIME,
      timeInSeconds: 0,
      isPlay: false
    };
    this.reset = this.reset.bind(this);
    this.breakIncr = this.breakIncr.bind(this);
    this.breakDecr = this.breakDecr.bind(this);
    this.sessionIncr = this.sessionIncr.bind(this);
    this.sessionDecr = this.sessionDecr.bind(this);
    this.timerIncr = this.timerIncr.bind(this);
    this.timerDecr = this.timerDecr.bind(this);
    this.startStop = this.startStop.bind(this);
  }

  reset() {
    this.setState({
      sessionValue: DEFAULT_SESSION_TIME,
      breakValue: DEFAULT_BREAK_TIME,
      currentProcess: SESSION,
      timeInMinutes: DEFAULT_SESSION_TIME,
      timeInSeconds: 0,
      isPlay: false
    });
  }

  breakIncr() {
    if (this.state.breakValue === 60) return;

    this.setState(prevState => ({
      breakValue: prevState.breakValue + 1
    }));
  }

  breakDecr() {
    if (this.state.breakValue === 1) return;

    this.setState(prevState => ({
      breakValue: prevState.breakValue - 1
    }));
  }

  timerIncr() {
    if (this.state.timeInMinutes === 60) {
      return;
    }

    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1
    }));
  }

  sessionIncr() {
    if (this.state.sessionValue === 60) {
      return;
    }

    this.setState(prevState => ({
      sessionValue: prevState.sessionValue + 1
    }));

    this.timerIncr();
  }

  timerDecr() {
    if (this.state.timeInMinutes === 1) {
      return;
    }

    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes - 1
    }));
  }

  sessionDecr() {
    if (this.state.sessionValue === 1) return;

    this.setState(prevState => ({
      sessionValue: prevState.sessionValue - 1
    }));
    this.timerDecr();
  }

  // while (this.state.timeInMinutes !== 0) {
  //   if (this.state.timeInSeconds === 0) {
  //     console.log("Inside if timeinsecon = 0 loop");
  //     this.setState(prevState => ({
  //       timeInMinutes: prevState.timeInMinutes - 1,
  //       timeInSeconds: 60
  //     }));
  //   }

  //   setTimeout(() => {
  //     this.setState(prevState => ({
  //       timeInSeconds: prevState.timeInSeconds - 1
  //     }));
  //     console.log("Inside settimeout");
  //   }, 1000);
  // }

  async startStop() {
    if (this.state.isPlay === false) {
      console.log("Inside if");
      this.setState(() => ({
        isPlay: true
      }));
      console.log("finish if");
    } else {
      this.setState(() => ({
        isPlay: false
      }));
    }
    while (this.state.timeInMinutes !== -1) {
      if (this.state.timeInSeconds === 0) {
        console.log("Inside if timeinsecon = 0 loop");
        this.setState(prevState => ({
          timeInMinutes: prevState.timeInMinutes - 1,
          timeInSeconds: 60
        }));
      }

      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds - 1
      }));
      await delay(1000);
      if (!this.state.isPlay) {
        return;
      }
    }
  }

  render() {
    return (
      <div>
        <BreakHandler
          breakValue={this.state.breakValue}
          breakIncr={this.breakIncr}
          breakDecr={this.breakDecr}
        />
        <SessionHandler
          sessionValue={this.state.sessionValue}
          sessionIncr={this.sessionIncr}
          sessionDecr={this.sessionDecr}
        />
        <Clock
          reset={this.reset}
          timeInMinutes={this.state.timeInMinutes}
          timeInSeconds={this.state.timeInSeconds}
          startStop={this.startStop}
        />
      </div>
    );
  }
}

//@ Break handler
const BreakHandler = props => (
  <div>
    <div id="break-label">Break Length</div>
    <button onClick={props.breakDecr} id="break-decrement">
      Break Decrement
    </button>
    <div id="break-length">{props.breakValue}</div>
    <button onClick={props.breakIncr} id="break-increment">
      Break Increment
    </button>
  </div>
);

//@ Session Handler
const SessionHandler = props => (
  <div>
    <div id="session-label">Session Length</div>
    <button onClick={props.sessionDecr} id="session-decrement">
      Session Decrement
    </button>
    <div id="session-length">{props.sessionValue}</div>
    <button onClick={props.sessionIncr} id="session-increment">
      Session Increment
    </button>
  </div>
);

//@ Clock
const Clock = props => (
  <div>
    <div id="timer-label">{props.currentProcess}</div>
    <div id="time-left">
      {props.timeInMinutes} : {props.timeInSeconds}
    </div>
    <button onClick={props.startStop} id="start_stop">
      Play/Pause
    </button>
    <button onClick={props.reset} id="reset">
      Reset
    </button>
  </div>
);

export default App;
