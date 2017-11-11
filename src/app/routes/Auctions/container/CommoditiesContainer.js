import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TypesPage from '../../../components/TypesPage'
import { connect } from 'react-redux'
import { loadCommodities, loadTypes, loadRoots } from '../modules/commodities'
import ChildNavBar from '../../../components/ChildNavBar'
import './commodities.less'

class CommoditiesContainer extends Component {
  static propTypes = {
    com: PropTypes.object.isRequired,
    loadCommodities: PropTypes.func.isRequired,
    loadRoots: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.loadRoots()
  }

  render() {
    const { types } = this.props.com
    const { loadCommodities } = this.props
    return (
      <div className="commodities-container">
        <ChildNavBar title="专场拍卖"/>
        <div className="commodities-content-wrapper">
          <TypesPage types={types} loadCommodities={loadCommodities} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  com: state.auction,
})

const mapDispatchToProps = {
  loadCommodities,
  loadTypes,
  loadRoots,
}

export default connect(mapStateToProps, mapDispatchToProps)(CommoditiesContainer)