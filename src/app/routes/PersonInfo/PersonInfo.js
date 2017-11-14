import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildNavBar from '../../components/ChildNavBar'
import './PersonInfo.less'
import { List, InputItem, Picker, Button, WhiteSpace, NoticeBar, ActivityIndicator, Toast } from 'antd-mobile'
import BindPhoneModal from '../../components/BindPhoneModal'
import { createForm } from 'rc-form'
import { get, patterns } from '../../Util'
import apiUrl from '../../apiUrl'
const ListItem = List.Item
class PersonInfo extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      info: {},
      showBindPhone: false,
      valPhone: '',
    }
  }
  handleToUpdate = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }
  componentDidMount() {
    this.loadInfo()
  }
  loadInfo = () => {
    this.setState({
      loading: true,
    })
    get(apiUrl.myMsgUrl).then(json => {
      if (json.success) {
        this.setState({
          loading: false,
          info: json.data,
        })
      } else {
        //TODO 获取登录路径并跳转到登录页
        Toast.fail('获取用户信息失败')
        this.props.history.push('/')
      }
    })
  }
  handleBindPhone = () => {
    this.setState({
      showBindPhone: !this.state.showBindPhone,
    })
  }
  savePhoneToState = (phone) => {
    this.setState({
      info: {
        ...this.state.info,
        phone,
      }
    })
  }


  render() {
    const { getFieldProps } = this.props.form
    const { info, showBindPhone } = this.state
    const setting = {
      rightContent: [<span onClick={this.handleToUpdate} key="person-update-btn">修改</span>],
      title: '个人信息'
    }
    if (this.state.edit) {
      setting.rightContent = [
        <span onClick={this.handleToUpdate} key="person-update-btn">取消</span>
      ]
      setting.title = '修改信息'
      setting.icon = null
    }
    return (
      <div>
        <ActivityIndicator
          toast
          text="正在获取用户信息..."
          animating={this.state.loading}
        />
        <BindPhoneModal visible={showBindPhone} hideFunc={this.handleBindPhone} savePhone={this.savePhoneToState} initialValue={info.phone} />
        <ChildNavBar {...setting} />
        <div className="person-info-container">
          {this.state.edit ? <List>
            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              暂不支持头像更改
            </NoticeBar>
            <InputItem
              {...getFieldProps('name', {
                rules: [{ required: true }],
                initialValue: `${info.nickname}`,
              }) }
              clear
              placeholder="点击输入昵称"
              ref={el => this.autoFocusInst = el}
            >昵称</InputItem>
            <Picker data={[{ value: 0, label: '男' }, { value: 1, label: '女' }]} cols={1} {...getFieldProps('gender', {
              initialValue: `${info.gender}`
            }) } className="forss">
              <ListItem arrow="horizontal">性别</ListItem>
            </Picker>
            <InputItem
              {...getFieldProps('phone', {
                rules: [{
                  required: true,
                  message: '请输入手机号码'
                }, {
                  pattern: patterns.phoneNumber,
                  message: '请输入正确的手机号码',
                }],
                initialValue: `${info.phone}`
              }) }
              clear
              placeholder="点击输入手机号"
              ref={el => this.autoFocusInst = el}
            >手机号</InputItem>
            <WhiteSpace size="md" />
            <Button type="primary">确认修改</Button>
          </List> : <List>
              <ListItem extra={
                <div className="person-list-avatar pull-right" />
              }>
                头像
            </ListItem>
              <ListItem extra={`${info.nickname}`}>
                昵称
            </ListItem>
              <ListItem extra={`${info.gender}`}>
                性别
            </ListItem>
              <ListItem extra={info.phone ? `${info.phone}` : '点击绑定'} onClick={this.handleBindPhone}>
                电话
            </ListItem>
            </List>}
        </div>
      </div>
    )
  }
}

export default createForm()(PersonInfo)