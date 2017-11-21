import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildNavBar from '../../components/ChildNavBar'
export default class Order extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <ChildNavBar title="确认订单" />
        <div className="custom-container">
          
        </div>
      </div>
    )
  }
}
