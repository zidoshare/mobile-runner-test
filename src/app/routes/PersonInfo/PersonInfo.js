import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildNavBar from '../../components/ChildNavBar'
import './PersonInfo.less'
import { List, InputItem, Picker, Button, WhiteSpace, NoticeBar, ActivityIndicator, Toast } from 'antd-mobile'
import BindPhoneModal from '../../components/BindPhoneModal'
import { createForm } from 'rc-form'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'
const ListItem = List.Item

const sexs = [
  '女',
  '男',
  '未知',
]
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
    get(apiUrl.myMsgUrl).then(data => {
      this.setState({
        loading: false,
        info: data,
      })
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
    console.log(info)
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
            <Picker data={[{ value: '0', label: '男' }, { value: '1', label: '女' }]} cols={1} {...getFieldProps('gender', {
              initialValue: info.gender
            }) }>
              <ListItem arrow="horizontal">性别</ListItem>
            </Picker>
            <WhiteSpace size="md" />
            <Button type="primary">确认修改</Button>
          </List> : <List>
              <ListItem extra={
                <div className="person-list-avatar pull-right" style={{ backgroundImage: `url(${info.headportrait})` }} />
              }>
                头像
            </ListItem>
              <ListItem extra={`${info.nickname}`}>
                昵称
            </ListItem>
              <ListItem extra={sexs[Number(info.gender)]}>
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