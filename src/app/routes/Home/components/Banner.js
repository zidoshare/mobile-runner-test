import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'antd-mobile'
import Slider from 'react-slick'
import './Banner.less'
export default class Banner extends Component {
  static propTypes = {
    banner: PropTypes.array,
    bannerLoading: PropTypes.bool.isRequired,
  }

  render() {
    const { banner, bannerLoading } = this.props
    let settings = {
      className: 'banner-container',
      infinite: true,
      // autoplay: true,
      autoplaySpeed: 2000,
      arrows:false,
      dots:true,
    }
    return (
      <div>
        {bannerLoading ? <ActivityIndicator text="正在加载" /> : <Slider
          {...settings}
        >
          {banner.map((ii, index) => (
            <img src={ii} key={'banner' + index} />
          ))}
        </Slider>}
      </div>
    )
  }
}
