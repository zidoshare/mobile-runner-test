import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Button } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import { Link } from 'react-router-dom'
import StandLink from '../StandLink'
export default class TypesPage extends Component {
  static propTypes = {
    types: PropTypes.array.isRequired,
    loadCommodities: PropTypes.func.isRequired,
  }
  renderTabBar = (props) => {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 10000 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>)
  }
  renderContent = tab => {
    if (!tab.initialed) {
      this.props.loadCommodities(tab.id)
    }
    const handleLoad = (currentPage) => {
      this.props.loadCommodities(tab.id, currentPage)
    }
    return (<div>
      {tab.commodities ? (
        tab.commodities.length > 0 ? tab.commodities.map((value) => (
          <StandLink to={`/commodity/${value.id}`} style={{}} key={`item-${value.id}`} className="com-list-item">
            <div className="com-list-item-head">{value.title}</div>
            <div style={{ padding: '15px 0' }}>
              <div style={{ textAlign: 'center' }}>
                <img style={{ width: '100%' }} src={`${value.head}${value.url}`} />
              </div>
              <div style={{ lineHeight: 1 }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{value.name}</div>
                <div><span style={{ fontSize: '22px', color: '#FF6E27' }}>¥{value.price}</span></div>
              </div>
            </div>
          </StandLink>
        )) :
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, background: '#fff' }}>
            <p>暂无数据</p>
          </div>
      ) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, background: '#fff' }}>
          <p>努力加载中...</p>
        </div>}
      {tab.hasMore ? <Button onClick={handleLoad.bind(this, tab.page.current + 1)}>点击加载更多</Button> : <div className="list-footer">
        <p>加载完毕</p>
      </div>}
    </div>)
  }
  render() {
    const { types } = this.props
    const tabs = types.map((value) => ({
      ...value,
      title: value.name
    }))

    return (
      <StickyContainer ref={(component) => this.stickyComponent = component}>
        <Tabs tabs={tabs} renderTabBar={this.renderTabBar}>
          {this.renderContent}
        </Tabs>
      </StickyContainer>
    )
  }
}
