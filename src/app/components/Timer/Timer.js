import React from 'react'
import PropTypes from 'prop-types'
import countdown from './countdown'
export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: props.startTime,
      remaining: '----:--:--',
      id: null,
      end: false,
    }
  }
  componentWillMount() {
    this.runTimer()
  }
  componentWillUnmount() {
    if (this.state.id) {
      window.clearInterval(this.state.id)
    }
  }
  runTimer() {
    if (this.state.id == null) {
      this.timer()
      this.setState({
        id: window.setInterval(this.timer.bind(this), 1000)
      })
    }
  }
  timer() {
    const { startTime } = this.state
    const { endTime } = this.props
    if (this.state.end) {
      window.clearInterval(this.state.id)
      this.setState({
        remaining: <span>拍卖结束</span>,
        id: null,
      }, this.props.callback())
      return
    }

    var diffSecond = parseInt((endTime - startTime) / 1000) //结束时间到现在差的秒数
    if (diffSecond > 0) {
      this.setState({
        remaining: countdown(startTime, endTime,{
          years: false,
          mouths: false,
          days: true,
          hours: true,
          minutes: true,
          seconds: true,
        }).formart(),
        startTime: new Date(startTime.getTime() + 1000)
      })
    } else {
      //timeout..
      window.clearInterval(this.state.id)
      this.setState({
        remaining: this.props.endText,
        id: null,
      }, this.props.callback())
    }
  }
  // var id = ;
  render() {
    const { style, className } = this.props
    return (
      <span style={style} className={className}>
        {this.state.remaining}
      </span>
    )
  }
}

Timer.defaultProps = {
  startTime: new Date(),
  callback: () => {
  },
  endText: '计时结束',
}
Timer.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  endTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]).isRequired,
  startTime: PropTypes.instanceOf(Date),
  callback: PropTypes.func,
  endText: PropTypes.node,
}