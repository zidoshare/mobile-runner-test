import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Banner from '../../../components/Banner'
import Menu from '../components/Menu'
import Finder from '../components/Finder'
import Recommends from '../components/Recommends'
import SliderList from '../components/SliderList'
import { loadAuctions, loadBanner, loadRecommeds, loadWinning } from '../modules/home'
import { loadUnReadCount } from '../../../reducers/message'
import { WhiteSpace } from 'antd-mobile'
export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    loadAuctions: PropTypes.func.isRequired,
    loadRecommeds: PropTypes.func.isRequired,
    loadWinning: PropTypes.func.isRequired,
    loadUnReadCount: PropTypes.func.isRequired,
    unReadCount: PropTypes.number.isRequired,
  }

  componentWillMount() {
    this.props.loadAuctions()
    this.props.loadRecommeds()
    this.props.loadWinning()
    this.props.loadUnReadCount()
  }
  render() {
    const { banner, bannerLoading, auction, auctionLoading, recommends, winners, recommendsLoading, winnersLoading } = this.props.home
    const unReadCount = this.props.unReadCount
    return (
      <div>
        {bannerLoading ? null : <Banner banner={banner} />}
        <WhiteSpace size="md" />
        <Menu count={unReadCount} />
        <WhiteSpace size="md" />
        {auctionLoading ? null : <Finder auction={auction} />}
        <WhiteSpace size="md" />
        {recommendsLoading ? null : <Recommends recommends={recommends} />}
        <WhiteSpace size="md" />
        {winnersLoading ? null : <SliderList winners={winners} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
  unReadCount: state.ms.unReadCount
})

const mapDispatchToProps = {
  loadAuctions,
  loadBanner,
  loadRecommeds,
  loadWinning,
  loadUnReadCount,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
