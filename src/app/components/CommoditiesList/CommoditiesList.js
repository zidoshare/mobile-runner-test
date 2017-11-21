import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, PullToRefresh } from 'antd-mobile'
import StandLink from '../StandLink'
import { isEmpty } from '../../Util'

const stateList = {
  'ADDPRICE': {
    span: '竞拍未完成',
  },
  'WAITREFUND': {
    span: '还未进行退款处理',
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
    span: '订单已处理 支付状态处理',
  },
  'PAYED': {
    span: '已支付',
  }
}
export default class CommoditiesList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    loadDataSource: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.object.isRequired,
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
  render() {

    const row = (rowData) => {
      return (
        <StandLink to={`/commodity/${rowData.id}`} style={{}} key={`item-${rowData.id}`} className="com-list-item">
          <div className="com-list-item-head">{rowData.title}</div>
          <div style={{ padding: '15px 0' }}>
            <div style={{ textAlign: 'center' }}>
              {isEmpty(rowData.url) ? <img style={{ width: '100%' }} src="http://odp22tnw6.bkt.clouddn.com/v2/ccas/default-no-pic.png" /> :
                <img style={{ width: '100%' }} src={`${rowData.head}${rowData.url}`} />}
            </div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
              <div className="clear-fix">
                <span style={{ fontSize: '22px', color: '#FF6E27' }}>¥{rowData.price}</span>
                {rowData.stateOnUser ? <div className="pull-right">
                  <span>{stateList[rowData.stateOnUser].span}</span>
                </div> : null}
              </div>
            </div>
          </div>
        </StandLink>
      )
    }
    if (this.state.dataSource.getRowCount() == 0) {
      return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, background: '#fff' }}>
        <p>暂无数据</p>
      </div>
    }
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.props.loading ? '加载中...' : '加载完毕'}
        </div>)}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        renderRow={row}
        className="am-list"
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    )
  }
}
