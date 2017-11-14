import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, InputItem, Modal, Toast, Button } from 'antd-mobile'
import { post, patterns } from '../../Util'
import apiUrl from '../../apiUrl'

function validatePhone(phone) {
  return patterns.phoneNumber.text(phone.replace(/\s/g, ''))
}
function validateCode(code) {
  return /[1-9a-zA-Z]{4}/.test(code)
}
export default class BindPhoneModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideFunc: PropTypes.func.isRequired,
    savePhone: PropTypes.func,
    form: PropTypes.object.isRequired,
    initialValue: PropTypes.string.isRequired,
  }
  static defaultProps = {
    savePhone: () => { },
    initialValue: '',
  }
  constructor(props) {
    super(props)
    this.state = {
      remaining: 0,
      phone: {
        value: props.initialValue,
        hasError: false,
      },
      code: {
        value: '',
        hasError: false,
      }
    }
  }
  onErrorClick = () => {
    if (this.state.phone.hasError) {
      Toast.info('请输入正确的手机号')
    }
  }
  onCodeErrorClick = () => {
    if (this.state.code.hasError) {
      Toast.info('验证码为4位(a-z,A-Z,1-9)的组合')
    }
  }
  onPhoneChange = (value) => {
    if (!validatePhone(value)) {
      this.setState({
        phone: {
          ...this.state.phone,
          hasError: true,
        }
      })
    } else {
      this.setState({
        phone: {
          ...this.state.phone,
          hasError: false,
        }
      })
    }
    this.setState({
      phone: {
        ...this.state.phone,
        value,
      },
    })
  }
  onCodeChange = (value) => {
    if (validateCode) {
      this.setState({
        code: {
          ...this.state.code,
          hasError: true,
        }
      })
    } else {
      this.setState({
        code: {
          ...this.state.code,
          hasError: false,
        }
      })
    }
    this.setState({
      code: {
        ...this.state.code,
        value,
      },
    })
  }
  sendCode = (phone) => {
    post(apiUrl.sendBindPhoneUrl, {
      phone,
    }).then(json => {
      if (json.success) {
        let remaining = 30
        let timer = setInterval(() => {
          this.setState({
            phoneRemain: remaining--,
          })
          if (remaining === 0) {
            clearInterval(timer)
          }
        }, 1000)
      }
    })
  }
  validateCodeFromServer = () => {
    const { phone, code } = this.state
    post(apiUrl.bindPhone, {
      phone,
      code,
    }).then(json => {
      if (json.success) {
        this.props.savePhone(phone)
        this.props.hideFunc()
        Toast.success('绑定成功', 1)
      }
    })
  }
  render() {
    const { visible } = this.props
    return (
      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        title="绑定手机号"
        footer={[{ text: '取消', onPress: this.props.hideFunc }, { text: '确定', onPress: this.validateCodeFromServer }]}
      >
        <List>
          <InputItem
            type="phone"
            error={this.state.phone.hasError}
            onErrorClick={this.onErrorClick}
            onChange={this.onPhoneChange}
            value={this.state.phone.value}
            placeholder="请输入手机号">
            手机号
            </InputItem>
          <InputItem
            placeholder="验证码"
            error={this.state.code.hasError}
            onErrorClick={this.onCodeErrorClick}
            onChange={this.onCodeChange}
            value={this.state.code.value}>
            <Button onClick={this.sendCode.bind(this, this.state.value)}
              visible={!this.state.hasError && this.state.remaining == 0}>
              {this.state.remaining > 0 ? `${this.state.remaining}秒后重新发送` : '获取验证码'}
            </Button>
          </InputItem>
        </List>
      </Modal>
    )
  }
}