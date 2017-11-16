import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadCommodities } from './modules'
import ChildNavBar from '../../components/ChildNavBar'
import { Link } from 'react-router-dom'
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
    const { commodities } = this.props.follow
    return (
      <div className="follow-container">
        <ChildNavBar title="我的收藏" rightContent={[]} />
        <div className="follow-content-wrapper">
          {commodities.map(value => (
            <Link to={`/commodity/${value.id}`} key={`item-${value.id}`} className="com-list-item">
              <div className="com-list-item-head">{value.title}</div>
              <div style={{ padding: '15px 0' }}>
                <div style={{ textAlign: 'center' }}>
                  <img style={{ height: '120px' }} src={`${value.head}${value.url}`} />
                </div>
                <div style={{ lineHeight: 1 }}>
                  <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{value.name}</div>
                  <div><span style={{ fontSize: '22px', color: '#FF6E27' }}>¥{value.price}</span></div>
                </div>
              </div>
            </Link>
          ))}
          {commodities.length === 0 ? <div className="no-data">
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