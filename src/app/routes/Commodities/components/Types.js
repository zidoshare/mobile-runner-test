import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tabs,Toast } from 'antd-mobile'
export default class Types extends Component {
  static propTypes = {
    types: PropTypes.array.isRequired,
    loadCommodities:PropTypes.func.isRequired,
  }
  renderContent = tab =>{
    if(!tab.initialed){
      this.props.loadCommodities(tab.id)
    }
    return (<div style={{ minHeight:600,backgroundColor: '#fff' }}>
      {tab.commodities?(
       tab.commodities.length > 0?tab.commodities.map((value,index) => (
        <div key={`${tab.id}tab${index}`}>{value.name}</div>
      )) :
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
        <p>暂无数据</p>
      </div>
      ):<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
      <p>努力加载中...</p>
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
      <div>
        <Tabs tabs={tabs}>
          {this.renderContent}
        </Tabs>
      </div>
    )
  }
}
