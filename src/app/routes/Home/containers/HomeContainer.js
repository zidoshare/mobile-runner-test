import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import Menu from '../components/Menu'
import Finder from '../components/Finder'
import Recommends from '../components/Recommends'
import SliderList from '../components/SliderList'
import {WhiteSpace,Button} from 'antd-mobile'
export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
  }

  render() {
    const {banner,bannerLoading,auction,auctionLoading,recommends,winners,recommendsLoading,winnersLoading} = this.props.home
    return (
      <div>
        <Button >按钮</Button>
        <Banner banner={banner} bannerLoading={bannerLoading}/>
        <WhiteSpace size="md" />
        <Menu/>
        <WhiteSpace size="md" />
        <Finder auction={auction} auctionLoading={auctionLoading}/>
        <WhiteSpace size="md" />
        <Recommends recommends={recommends} recommendsLoading={recommendsLoading}/>
        <WhiteSpace size="md"/>
        <SliderList winners={winners} winnersLoading={winnersLoading}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  home:state.home
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
