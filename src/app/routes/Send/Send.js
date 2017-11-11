import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, InputItem, Picker, ImagePicker } from 'antd-mobile'
import ChildNavBar from '../../components/ChildNavBar'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'
import { createForm } from 'rc-form'
const ListItem = List.Item
import './Send.less'
class Send extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      types: []
    }
  }
  componentDidMount() {
    get(apiUrl.typesUrl).then(json => {
      if (json.success)
        this.setState({
          types: json.data.map(value => {
            return {
              value: value.id,
              label: value.name,
            }
          }),
        })
    })
  }
  render() {
    const { getFieldProps } = this.props.form
    const { types } = this.state
    return (
      <div>
        <ChildNavBar title="上传拍品" />
        <div className="send-form-container">
          <List>
            <InputItem
              {...getFieldProps('name') }
              placeholder="点击输入拍品名称"
            >拍品名称</InputItem>
            <Picker data={types} cols={1} {...getFieldProps('type') }>
              <ListItem arrow="horizontal">拍品分类</ListItem>
            </Picker>
            <InputItem
              {...getFieldProps('userName') }
              placeholder="点击输入藏主姓名"
            >藏主姓名</InputItem>
            <InputItem
              {...getFieldProps('phone') }
              placeholder="点击输入联系电话"
            >联系电话</InputItem>
            <InputItem
              {...getFieldProps('price') }
              placeholder="点击输入自报价"
            >自报价</InputItem>
            <InputItem
              {...getFieldProps('email') }
              placeholder="点击输入邮箱"
            >联系邮箱</InputItem>
            <ListItem>
              <p>
                图片上传
              </p>
              <ImagePicker
              />
            </ListItem>
          </List>
        </div>
      </div>
    )
  }
}


export default createForm()(Send)