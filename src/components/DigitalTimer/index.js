import {Component} from 'react'
import './index.css'

const initialTime = {isTimerRunning: false, timeInSeconds: 0, timeInMinutes: 25}

class DigitalTimer extends Component {
  state = initialTime

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  onDecreaseTimer = () => {
    const {timeInMinutes} = this.state

    if (timeInMinutes > 1) {
      this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes - 1}))
    }
  }

  onIncreaseTimer = () => {
    this.setState(prevState => ({timeInMinutes: prevState.timeInMinutes + 1}))
  }

  renderTimerLimitController = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonDisabled = timeInSeconds > 0

    return (
      <div className="timer-limit-controller">
        <p className="text-label">Set Timer Limit</p>
        <div className="button-container">
          <button
            className="operator"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onDecreaseTimer}
          >
            -
          </button>
          <p className="minutes-container">{timeInMinutes}</p>
          <button
            className="operator"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onIncreaseTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialTime)
  }

  IncrementTimeElapsedInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInMinutes * 60 === timeInSeconds

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInMinutes * 60 === timeInSeconds

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.IncrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-control-button"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="image"
          />
          <p className="timer-control-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          className="timer-control-button"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
            alt="reset icon"
            className="image"
          />
          <p className="timer-control-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedTimeInFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    console.log(totalRemainingSeconds)

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="timer-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="timer-section">
          <div className="left-section">
            <div className="timer">
              <h1 className="time">{this.getElapsedTimeInFormat()}</h1>
              <p className="status">{labelText}</p>
            </div>
          </div>
          <div className="right-section">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
