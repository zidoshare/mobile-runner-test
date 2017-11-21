import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import './Banner.less'
export default class Banner extends Component {
  static propTypes = {
    banner: PropTypes.array,
    bannerLoading: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    bannerLoading: false,
  }

  render() {
    const { banner } = this.props
    let settings = {
      className: 'banner-container',
      infinite: true,
      // autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots: true,
      adaptiveHeight: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const bannerList = banner.map((ii, index) => (
      <div key={'banner' + index} className="banner-item-container">
        <img src={ii} />
      </div>
    ))
    return (
      bannerList.length > 0 ? <Slider
        {...settings}
      >
        {bannerList}
      </Slider> : <div />
    )
  }
}
