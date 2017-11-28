import React, { Component } from 'react'
import CommoditiesList from '../../components/CommoditiesList'
import ChildNavBar from '../../components/ChildNavBar'
import { loadCommodities } from './module'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
class MyHistory extends Component {
  static propTypes = {
    loadCommodities: PropTypes.func.isRequired,
    his: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.props.loadCommodities()
  }
  render() {
    const { commodities, hasMore, loading, page } = this.props.his
    const setting = {
      dataSource: commodities || [],
      hasMore: hasMore == null ? false : hasMore,
      loadDataSource: this.props.loadCommodities.bind(this),
      loading: loading,
      page: page || {},
    }

    return (
      <div className="follow-container">
        <ChildNavBar title="历史记录" rightContent={[]} />
        <div className="follow-content-wrapper">
          <CommoditiesList {...setting} />
          {commodities.length === 0 && !loading ? <div className="no-data">
            <br />
            还没浏览过商品？赶紧去逛逛吧
            <br />
            <br />
            <Link to="/commodities">点击浏览</Link>
          </div> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  his: state.his
})

const mapDispatchToProps = {
  loadCommodities,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHistory)
