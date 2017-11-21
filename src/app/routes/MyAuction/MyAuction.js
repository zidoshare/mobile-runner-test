import React, { Component } from 'react'
import TypesPage from '../../components/TypesPage'
import ChildNavBar from '../../components/ChildNavBar'
import { loadCommodities } from './module'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
class MyAuction extends Component {
  static propTypes = {
    types: PropTypes.array.isRequired,
    loadCommodities: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    const {types,loadCommodities} = this.props
    types.forEach(t => {
      loadCommodities(t.id)
    })
  }
  render() {
    const { types, loadCommodities } = this.props
    return (
      <div className="commodities-container">
        <ChildNavBar title="我的拍卖"/>
        <div className="commodities-content-wrapper">
          <TypesPage types={types} loadCommodities={loadCommodities} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.mau
})

const mapDispatchToProps = {
  loadCommodities,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAuction)
