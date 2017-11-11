import React, { Component } from 'react'
import ChildNavBar from '../../components/ChildNavBar'
import { List, Modal } from 'antd-mobile'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'
const ListItem = List.Item
const Brief = ListItem.Brief
const operation = Modal.operation
export default class MyAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: [],

    }
  }
  componentDidMount() {
    this.loadAddress()
  }
  loadAddress = () => {
    get(apiUrl.allAddressUrl).then(json => {
      if (json.success) {
        this.setState({
          address: json.data,
        })
      }
    })
  }
  render() {
    return (
      <div>
        <ChildNavBar title="我的收货地址" />
        <div className="custom-container">
          <List>
            {this.state.address.map((value, index) => (
              <ListItem key={'adress' + index} extra={value.receivingName} align="top" multipleLine onClick={() => operation([
                { text: '编辑', onPress: () => console.log('标为未读被点击了') },
                { text: '删除', onPress: () => console.log('置顶聊天被点击了') },
              ])}>
                {value.receivingPhone}
                <Brief>{value.address}</Brief>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  }
}
