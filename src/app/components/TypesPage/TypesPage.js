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