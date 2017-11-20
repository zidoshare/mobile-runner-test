import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCommodities } from './modules'
import ChildNavBar from '../../components/ChildNavBar'
import { Link } from 'react-router-dom'
import CommoditiesList from '../../components/CommoditiesList'
import './Follow.less'
class Follow extends Component {
  static propTypes = {
    follow: PropTypes.object.isRequired,
    loadCommodities: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadCommodities()
  }
  render() {
    const { commodities, hasMore, loading, page } = this.props.follow
    const setting = {
      dataSource: commodities || [],
      hasMore: hasMore == null ? false : hasMore,
      loadDataSource: this.props.loadCommodities.bind(this),
      loading: loading,
      page: page || {},
    }

    return (
      <div className="follow-container">
        <ChildNavBar title="我的收藏" rightContent={[]} />
        <div className="follow-content-wrapper">
          <CommoditiesList {...setting} />
          {commodities.length === 0 && !loading ? <div className="no-data">
            <br />
            还没有收藏？赶紧去逛逛吧
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
  follow: state.follow,
})

const mapDispatchToProps = {
  loadCommodities,
}

export default connect(mapStateToProps, mapDispatchToProps)(Follow)