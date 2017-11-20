import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd-mobile'
import CommoditiesList from '../CommoditiesList'
import './TypesPage.less'
export default class TypesPage extends Component {
  static propTypes = {
    types: PropTypes.array.isRequired,
    loadCommodities: PropTypes.func.isRequired,
  }

  renderTabBar = (props) => {
    return <div className="fix-tab-bar"><Tabs.DefaultTabBar {...props} /></div>
  }
  renderContent = tab => {
    const setting = {
      dataSource: tab.commodities || [],
      hasMore: tab.hasMore == null ? false : tab.hasMore,
      loadDataSource: this.props.loadCommodities.bind(this, tab.id),
      loading: tab.loading,
      page: tab.page || {},
    }
    return (<div className="fix-tab-content">
      <CommoditiesList {...setting} />
    </div>)
  }
  render() {
    const { types } = this.props
    const tabs = types.map((value) => ({
      ...value,
      title: value.name
    }))

    return (
      <Tabs tabs={tabs} renderTabBar={this.renderTabBar}>
        {this.renderContent}
      </Tabs>
    )
  }
}


// {tab.commodities ? (
//   tab.commodities.length > 0 ? tab.commodities.map((value) => (
//     <StandLink to={`/commodity/${value.id}`} style={{}} key={`item-${value.id}`} className="com-list-item">
//       <div className="com-list-item-head">{value.title}</div>
//       <div style={{ padding: '15px 0' }}>
//         <div style={{ textAlign: 'center' }}>
//           {isEmpty(value.url) ? <img style={{ width: '100%' }} src="http://odp22tnw6.bkt.clouddn.com/v2/ccas/default-no-pic.png" /> :
//             <img style={{ width: '100%' }} src={`${value.head}${value.url}`} />}
//         </div>
//         <div style={{ lineHeight: 1 }}>
//           <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{value.name}</div>
//           <div><span style={{ fontSize: '22px', color: '#FF6E27' }}>¥{value.price}</span></div>
//         </div>
//       </div>
//     </StandLink>
//   )) :
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, background: '#fff' }}>
//       <p>暂无数据</p>
//     </div>
// ) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100, background: '#fff' }}>
//     <p>努力加载中...</p>
//   </div>}
// {tab.hasMore ? <Button onClick={handleLoad.bind(this, tab.page.current + 1)}>点击加载更多</Button> : <div className="list-footer">
//   <p>加载完毕</p>
// </div>}