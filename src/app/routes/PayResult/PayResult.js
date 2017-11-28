import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Result, Icon } from 'antd-mobile'
import { getQueryString } from '../../Util'
import ChildNavBar from '../../components/ChildNavBar'
import { transAfter, transBegining } from '../../reducers'
import apiUrl from '../../apiUrl'
import { get } from '../../Util'
import './PayResult.less'
const codes = {
  'wait-result': {
    img: <img src={'https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg'} className='spe am-icon am-icon-md' alt='' />,
    title: '结果确认中',
    message: '已成功提交支付信息，正在等待结果，您可以直接返回并继续操作'
  },
  'pay-success': {
    img: < Icon type='check-circle' className='spe' style={{ fill: '#1F90E6' }} />,
    title: '支付成功',
    message: '支付已完成，将在3秒内自动返回操作页面，您也可以直接点击完成并继续操作',
  },
  'pay-fail': {
    img: <Icon type='cross-circle-o' className='spe' style={{ fill: '#F13642' }} />,
    title: '支付失败',
    message: '由于某些原因，支付失败了，如有已支付的金额将在1-3天内返回原账户，您可以点击完成并重试',
  }
}
export default class PayResult extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      orderId: this.props.match.params.orderId,
      code: getQueryString('code') || 'wait-result',
    }
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  loadResult = (orderId) => {
    if (orderId && this.state.code == 'wait-result') {
      setTimeout(() => {
        get(apiUrl.payStateUrl, {
          orderId: this.state.orderId
        }).then(() => {
          this.setState({
            code: 'pay-success',
          }, () => {
            this.timer = setTimeout(transAfter, 3000)
          })
        }).catch(() => {
          this.setState({
            code: 'pay-fail'
          })
        })
      }, 3000)
    }
  }

  componentWillMount() {
    this.loadResult(this.state.orderId)
  }

  handleFinish = () => {
    if (transBegining()) {
      transAfter()
    } else {
      this.props.history.goBack()
    }
  }
  render() {
    let setting = {
      rightContent: [
        <span key='payresult-end-btn' onClick={this.handleFinish}>完成</span>
      ],
      icon: null,
      fix: false,
      title: '支付结果',
    }
    const result = codes[this.state.code]
    return (
      <div className='pay-result-container'>
        <ChildNavBar {...setting} />
        <Result {...result} />
      </div>
    )
  }
}
