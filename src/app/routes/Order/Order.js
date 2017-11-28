import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildNavBar from '../../components/ChildNavBar'
import { get, post, pay } from '../../Util'
import apiUrl from '../../apiUrl'
import { List, Badge, Card, WhiteSpace, Flex, Button, ActivityIndicator, Toast, TextareaItem, Modal } from 'antd-mobile'
import { transBeginTo } from '../../reducers'
import MyAddress from '../MyAddress'
const ListItem = List.Item
const Brief = ListItem.Brief
const FlexItem = Flex.Item
const methods = {
  'WECHAT': '微信支付',
  'QQ': '财付通',
  'BANK': '银行卡',
  'ALI_PAY': '支付宝',
}
export default class Order extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        commodityId: this.props.match.params.id,
        payMethod: 'WECHAT',
      },
      address: {},
      freightPrice: 0,
      commodity: {},
      loading: true,
      payMethodLabel: methods['WECHAT'],
      chooseAddress: false,
    }
  }
  componentDidMount() {
    this.loadAddress().then(() => this.setState({
      loading: false,
    }))
    this.loadCommodity()
    this.loadFreightPrice()
  }
  onCommentChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        userComment: value,
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    post(apiUrl.placeOrderUrl, this.state.data).then((result) => {
      const opt = {
        orderId: result.orderId,
        commodityId: this.state.data.commodityId,
        payMethod: this.state.data.payMethod,
      }
      return post(apiUrl.payOrderUrl, opt).then(result => {
        return result
      }).then(pay).then(() => {
        transBeginTo({
          pathname: `/payResult/${result.orderId}`,
          search: '?code=wait-result'
        }, '/myAuction')
      }).catch((res) => {
        if (res.err_desc)
          Toast.fail(res.err_desc)
        else if (res.message)
          Toast.fail(res.err_desc)
      })
    })
  }
  render() {
    const { address, freightPrice, commodity, loading, payMethodLabel } = this.state
    const { userComment } = this.state.data
    const { images } = commodity
    let url = 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/default-no-pic.png'
    if (images && images.length > 0) {
      const t = images.filter(value => {
        if (value.sort === 0) {
          return true
        }
      })
      if (t.length > 0) {
        url = t[0].head + t[0].url
      } else {
        url = images[0].head + images[0].url
      }
    }
    if (this.state.chooseAddress) {
      return <MyAddress choose onChoose={(value) => {
        if (!value) {
          this.setState({
            chooseAddress: false,
          })
        }
        this.setState({
          address: value,
          chooseAddress: false,
          data: {
            ...this.state.data,
            receivingId: value.id,
          }
        })

      }} />
    }
    return (
      <div>
        <ChildNavBar title="确认订单" />
        <div className="custom-container">
          {loading ? <ActivityIndicator toast
            text="加载中..." /> : <List>
              <ListItem extra={address.receivingName} align="middle" multipleLine arrow="horizontal" onClick={() => {
                this.setState({
                  chooseAddress: true,
                })
              }}>
                {address.address}
                <Brief>{address.receivingPhone}{address.isDefault ? <Badge text={'默认地址'} style={{ marginLeft: 12 }} /> : null}</Brief>
              </ListItem>
              <WhiteSpace size="lg" />
              <Card full onClick={() => {
                this.props.history.push(`/commodity/${commodity.id}`)
              }}>
                <Card.Header
                  title={commodity.name}
                  thumb={url}
                  thumbStyle={{
                    width: 160,
                  }}
                />
                <Card.Body>
                  <Flex>
                    <FlexItem>
                      <span>成交价</span>
                    </FlexItem>
                    <FlexItem>
                      <span className="money">{commodity.currentPrice}</span>
                    </FlexItem>
                  </Flex>
                </Card.Body>
              </Card>
              <TextareaItem
                clear
                autoHeight
                count={100}
                rows={5}
                title="买家留言"
                value={userComment}
                onChange={this.onCommentChange}
                placeholder="备注">

              </TextareaItem>
              <ListItem>
                <Flex>
                  <span>运送方式：</span>
                  <FlexItem>
                    {freightPrice === 0 ? '免运费' : '运费：' + freightPrice + '元'}
                  </FlexItem>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex>
                  <span>支付方式：</span>
                  <FlexItem>
                    {payMethodLabel}
                  </FlexItem>
                </Flex>
              </ListItem>
              <ListItem onClick={() => {
                Modal.alert('实际支付金额 = 得拍价格 - 保证金 + 运费')
              }}>
                <Flex>
                  <span>实际支付金额：</span>
                  <FlexItem>
                    {`${commodity.currentPrice - commodity.bond + freightPrice}元`}
                  </FlexItem>
                </Flex>
              </ListItem>
              <ListItem>
                <Button type="primary" onClick={this.handleSubmit}>提交订单</Button>
              </ListItem>
            </List>}

        </div>
      </div>
    )
  }

  loadAddress = () => {
    return get(apiUrl.defaultAddress).then(data => {
      this.setState({
        data: {
          ...this.state.data,
          receivingId: data.id,
        },
        address: data,
      })
    })
  }

  loadCommodity = () => {
    const { commodityId } = this.state.data
    return get(apiUrl.commodityUrl, {
      id: commodityId
    }).then(data => {
      this.setState({
        commodity: data,
      })
    })
  }

  loadFreightPrice = () => {
    const { commodityId } = this.state.data
    return get(apiUrl.freightPrice, {
      commodityId,
    }).then(data => {
      this.setState({
        freightPrice: data.price,
      })
    })
  }
}
