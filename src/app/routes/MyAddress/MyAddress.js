import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildNavBar from '../../components/ChildNavBar'
import { List, Modal, Button, InputItem, TextareaItem, Switch, Badge } from 'antd-mobile'
import { get, post } from '../../Util'
import apiUrl from '../../apiUrl'
import { createForm } from 'rc-form'
import { transAfter } from '../../reducers'
const ListItem = List.Item
const Brief = ListItem.Brief
const operation = Modal.operation
class MyAddress extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      address: [],
      edit: false,
      update: false,
      postLoading: false,
      error: {},
      val: {},
    }
  }
  componentDidMount() {
    this.loadAddress()
  }
  loadAddress = () => {
    get(apiUrl.allAddressUrl).then(data => {
      this.setState({
        address: data,
      })
    })
  }
  handleAdd = () => {
    this.setState({
      edit: !this.state.edit,
      val: {}
    })
  }
  onClickUpdate = () => {
    this.setState({
      update: false,
    })
  }

  handleSubmitAdd = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        this.setState({
          postLoading: true,
        })
        const url = this.state.update ? apiUrl.updateAddressUrl : apiUrl.addAddressUrl
        if (this.state.update) {
          value.id = this.state.val.id
        }
        post(url, value).then(() => {
          this.setState({
            postLoading: false,
            edit: false,
            update: false,
          }, transAfter)
          this.loadAddress()
        }).catch(() => this.setState({
          postLoading: false,
          val: this.state.update ? {} : this.state.val,
        }))
      } else {
        this.setState({
          error,
        })
      }
    })
  }

  handleDelete = (infoId) => {
    get(apiUrl.delAddressUrl, {
      infoId,
    }).then(() => {
      this.loadAddress()
    })
  }

  handleUpdate = (val) => {
    this.setState({
      update: true,
      val,
    })
  }

  handleDefault = (infoId) => {
    post(apiUrl.setDefaultAddressUrl + `?infoId=${infoId}`).then(() => {
      this.loadAddress()
    })
  }

  render() {

    const setting = {
      rightContent: [],
      title: '我的收货地址'
    }
    if (this.state.edit) {
      setting.rightContent = [
        <span onClick={this.handleAdd} key="person-update-btn">取消</span>
      ]
      setting.title = '添加收货地址'
      setting.icon = null
    }
    if (this.state.update) {
      setting.rightContent = [
        <span onClick={this.onClickUpdate} key="person-update-btn">取消</span>
      ]
      setting.title = '编辑收货信息'
      setting.icon = null
    }
    return (
      <div>
        <ChildNavBar {...setting} />
        <div className="custom-container">
          {this.getFormDom()}
          {this.getCommonDom()}

        </div>
      </div>
    )
  }

  getFormDom() {
    const { getFieldProps } = this.props.form
    if (this.state.edit || this.state.update) {
      return <List>
        <InputItem
          {...getFieldProps('receivingName', {
            rules: [{ required: true, message: '请填写收货人姓名' }],
            initialValue: this.state.val.receivingName
          }) }
          clear
          placeholder="点击输入姓名"
        >收货人姓名</InputItem>
        <TextareaItem
          {...getFieldProps('address', {
            rules: [{ required: true, message: '请填写收货地址' }],
            initialValue: this.state.val.address
          }) }
          title="收货地址"
          placeholder="点击输入收货地址"
          autoHeight
          labelNumber={5}
        />
        <InputItem
          {...getFieldProps('receivingPhone', {
            rules: [{ required: true, message: '请填写联系电话' }],
            initialValue: this.state.val.receivingPhone
          }) }
          clear
          placeholder="点击输入联系电话"
        >联系电话</InputItem>
        <ListItem
          extra={<Switch
            {...getFieldProps('isDefault', {
              initialValue: this.state.val.isDefault == null ? true : this.state.val.isDefault,
              valuePropName: 'checked',
            }) }
          />}
        >设为默认地址</ListItem>
        <ListItem>
          <Button type="primary" onClick={this.handleSubmitAdd}>确认</Button>
        </ListItem>
      </List>
    }
  }

  getCommonDom = () => {
    if (!this.state.edit && !this.state.update) {
      return <List>
        {this.state.address.map((value, index) => (
          <ListItem key={'address' + index} extra={value.receivingName} align="top" multipleLine onClick={() => operation([
            { text: '编辑', onPress: this.handleUpdate.bind(this, value) },
            { text: '删除', onPress: this.handleDelete.bind(this, value.id) },
            { text: '设为默认收货地址', onPress: this.handleDefault.bind(this, value.id) },
          ])}>
            {value.address}
            <Brief>{value.receivingPhone}{value.isDefault ? <Badge text={'默认地址'} style={{ marginLeft: 12 }} /> : null}</Brief>
          </ListItem>
        ))}
        <ListItem>
          <Button type="primary" size="small" icon="plus" onClick={this.handleAdd}>添加收货地址</Button>
        </ListItem>
      </List>
    }
  }
}

export default createForm()(MyAddress)
