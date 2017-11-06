import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'

export default class Career extends PureComponent {
  componentDidMount(){
    this.props.loadData()
  }
  handleTableChange(pagination, filters, sorter){
    this.props.loadData({
      currentPage:pagination.current,
      pageSize:pagination.pageSize,
      ...filters,
      sorters:[{
        sortName:sorter.field,
        sortOrder:sorter.order === 'desc'?0:1,
      }]
    })
  }
  render() {
    const {data,loading,pagination} = this.props.career
    console.log(loading)
    return (
      <div>
        <Table 
          loading={loading} 
          dataSource={data} 
          rowKey={record => record.id} 
          pagination={pagination} 
          onChange={this.handleTableChange.bind(this)}/>
      </div>
    )
  }
}

Career.propTypes = {
  career:PropTypes.object.isRequired,
  loadData:PropTypes.func.isRequired,
}