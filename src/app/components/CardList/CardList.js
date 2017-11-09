import { ListView,Button } from 'antd-mobile'
import React from 'react'
import PropTypes from 'prop-types'

export default class CardList extends React.Component {

  static propTypes = {
    dataSource: PropTypes.any,
    loadData: PropTypes.func.isRequired,
    hasMore: PropTypes.bool,
    isLoading: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
      isLoading: true,
    }
  }

  componentDidMount = () => {
    this.setState({
      isLoading:true,
    })
    this.props.loadData(true).then(() => {
      this.setState({
        isLoading:false,
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      if (nextProps.dataSource)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
        })
      else {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
        })
      }
    }
  }

  handleLoad = () => {
    if (this.state.isLoading && !this.props.hasMore) {
      return
    }
    this.props.loadData()
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    )
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{rowData.title}</div>
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={`${rowData.head}${rowData.url}`} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowData.price}</span>¥</div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : (this.props.hasMore ? <Button onClick={this.handleLoad}>点击加载</Button> : (this.state.dataSource.getRowCount() > 0 ? '加载完毕' : '暂无数据'))}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        useBodyScroll
      />
    )
  }
}