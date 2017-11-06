import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel,ActivityIndicator } from 'antd-mobile'
export default class Banner extends Component {
  static propTypes = {
    banner:PropTypes.array,
    bannerLoading:PropTypes.bool.isRequired,
  }

  render() {
    const {banner,bannerLoading} = this.props
    return (
      <div>
        {bannerLoading?<ActivityIndicator text="正在加载"/>:<Carousel
          className="my-carousel"
          autoplay={false}
          infinite
          selectedIndex={1}
          swipeSpeed={35}
        >
          {banner.map(ii => (
            <img src={ii}/>
          ))}
        </Carousel>}
      </div>
    )
  }
}
