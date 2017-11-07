import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Types from '../components/Types'
import {connect} from 'react-redux'
import {loadCommodities,loadTypes,loadRoots} from '../modules/commodities'
import ChildNavBar from '../../../components/ChildNavBar'
class CommoditiesContainer extends Component {
  static propTypes = {
    com: PropTypes.object.isRequired,
    loadCommodities: PropTypes.func.isRequired,
    loadRoots:PropTypes.func.isRequired,
    history:PropTypes.object.isRequired,
  }

  componentDidMount(){
    this.props.loadRoots()
  }

  render() {
    const { types } = this.props.com
    const { loadCommodities } = this.props
    return (
      <div>
        <ChildNavBar title="分类拍卖"/>
        <Types types={types} loadCommodities={loadCommodities} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  com:state.com,
})

const mapDispatchToProps = {
  loadCommodities,
  loadTypes,
  loadRoots,
}

export default connect(mapStateToProps,mapDispatchToProps)(CommoditiesContainer)