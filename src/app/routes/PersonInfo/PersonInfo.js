import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildNavBar from '../../components/ChildNavBar'
import './PersonInfo.less'
import { List, InputItem, Picker, Button, WhiteSpace, NoticeBar } from 'antd-mobile'
import { createForm } from 'rc-form'
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
    }
  }
  handleToUpdate = () => {
    this.setState({
      edit: !this.state.edit,
    })
  }
  componentDidMount() {

  }

  render() {
    const { getFieldProps } = this.props.form
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
        <ChildNavBar {...setting} />
        <div className="person-info-container">
          {this.state.edit ? <List>
            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
              暂不支持头像更改
            </NoticeBar>
            <InputItem
              {...getFieldProps('name') }
              clear
              placeholder="点击输入昵称"
              ref={el => this.autoFocusInst = el}
            >昵称</InputItem>
            <Picker data={[{ value: 0, label: '男' }, { value: 1, label: '女' }]} cols={1} {...getFieldProps('sex') } className="forss">
              <ListItem arrow="horizontal">性别</ListItem>
            </Picker>
            <InputItem
              {...getFieldProps('phone') }
              clear
              placeholder="点击输入电话"
              ref={el => this.autoFocusInst = el}
            >电话</InputItem>
            <WhiteSpace size="md" />
            <Button type="primary">确认修改</Button>
          </List> : <List>
              <ListItem extra={
                <div className="person-list-avatar pull-right" />
              }>
                头像
            </ListItem>
              <ListItem extra={'不哭不闹不上吊'}>
                昵称
            </ListItem>
              <ListItem extra={'女'}>
                性别
            </ListItem>
              <ListItem extra={'183xxxx2333'}>
                电话
            </ListItem>
            </List>}
        </div>
      </div>
    )
  }
}

export default createForm()(PersonInfo)