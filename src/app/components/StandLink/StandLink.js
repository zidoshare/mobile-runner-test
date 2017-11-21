import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './StandLink.less'
class StandLink extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    out: PropTypes.bool.isRequired,
    newTab: PropTypes.bool.isRequired,
    block: PropTypes.bool,
  }
  static defaultProps = {
    out: false,
    className: '',
    newTab: false,
  }
  handleGoto = () => {
    const { to } = this.props
    if (this.props.out) {
      if (this.props.newTab) {
        window.open(to)
      } else
        window.location.href = to
    } else
      this.props.history.push(to)
  }
  render() {
    const { children } = this.props
    const props = {
      style: this.props.style || (this.props.block ? null : { display: 'inline-block' }),
      className: 'stand-link ' + this.props.className,
    }
    return (
      <div {...props} onClick={this.handleGoto}>
        {children}
      </div>
    )
  }
}

export default withRouter(StandLink)