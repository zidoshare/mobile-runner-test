import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh, List, Badge } from 'antd-mobile'
import StandLink from '../StandLink'
import { isEmpty } from '../../Util'
// const $clamp = require('clamp-js')
const ListItem = List.Item
const Brief = ListItem.Brief
const stateList = {
  'ADDPRICE': {
    span: '竞拍未完成',
  },
  'WAITREFUND': {
    span: '等待退款',
  },
  'REFUNDING': {
    span: '退款中',
  },
  'REFUNDED': {
    span: '退款完成',
  },
  'EDITORDER': {
    span: '竞拍完成,填写订单',
  },
  'TOPAY': {
    span: '未支付',
  },
  'PAYED': {
    span: '已支付，待发货',
  }
}

function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}
export default class CommoditiesList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadDataSource: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['commodity', 'message']),
    history: PropTypes.object,
  }
  static defaultProps = {
    height: 90,
    type: 'commodity'
  }
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.dataSource),
      refreshing: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      })
    }
  }
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    this.props.loadDataSource().then(() => {
      this.setState({
        refreshing: false,
        isLoading: false,
      })
    })

  }
  onEndReached = () => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.props.loading && !this.props.hasMore) {
      return
    }
    const { page } = this.props
    this.props.loadDataSource(page.current + 1)
  }

  handleToLink = () => {
    
  }

  render() {
    const listStyle = { overflow: 'auto', }
    if (this.props.height) {
      listStyle.minHeight = getViewportSize().height - this.props.height
    }
    const row = (rowData) => {
      const { stateOnUser } = rowData
      const type = this.props.type
      if (type == 'message') {
        return <ListItem
          arrow="horizontal"
          multipleLine
          wrap
          align="middle"
          onClick={() => { this.props.history.push(`/messages/info/${rowData.id}`) }}>
          {rowData.isRead == 0 ? <Badge dot><span>{rowData.title}</span></Badge> : <span>{rowData.title}</span>}<Brief>{rowData.content}</Brief>
        </ListItem>
      }
      let to = `/commodity/${rowData.id}`
      if (stateOnUser == 'EDITORDER' || stateOnUser == 'TOPAY')
        to = `/order/${rowData.id}`
      else if (stateOnUser == 'PAYED')
        to = this.handleToLink
      return (
        <StandLink to={to} style={{}} key={`item-${rowData.id}`} className="com-list-item">
          <div className="com-list-item-head">{rowData.title}</div>
          <div style={{ padding: '15px 0' }}>
            <div style={{ textAlign: 'center' }}>
              {isEmpty(rowData.url) ? <img style={{ width: '100%' }} src="http://odp22tnw6.bkt.clouddn.com/v2/ccas/default-no-pic.png" /> :
                <img style={{ width: '100%' }} src={`${rowData.head}${rowData.url}`} />}
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
              <div className="clear-fix">
                <span style={{ fontSize: '22px', color: '#FF6E27' }}>¥{rowData.currentPrice}</span>
                {rowData.stateOnUser ? <div className="pull-right">
                  <span>{stateList[rowData.stateOnUser].span}</span>
                </div> : null}
              </div>
            </div>
          </div>
        </StandLink>
      )
    }
    return (
      <div style={listStyle}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            this.props.loading ? <div style={{ padding: 30, textAlign: 'center' }}>加载中...</div> :
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
                加载完毕
            </div>
          )}
          pullToRefresh={<PullToRefresh
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />}
          renderRow={row}
          useBodyScroll
          className="am-list"
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
          style={{ height: '100%' }}
          contentContainerStyle={listStyle}
        />
      </div>
    )
  }
}
