import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank } from 'antd-mobile'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './SliderList.less'
import Slider from 'react-slick'
export default class SliderList extends Component {
  static propTypes = {
    winners: PropTypes.array.isRequired,
  }

  render() {
    const { winners } = this.props
    let settings = {
      draggable: false,
      arrows: false,
      slidesToShow: 6,
      className: 'win-list-container',
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      vertical: true,
    }
    return (
      <WingBlank size="sm" className="winner-slider-container">
        <h1>幸运大咖</h1>
        <div className="winner-slider-container-panel">
          <Slider {...settings}>
            {winners.map((value, index) => (
              <div key={'winner' + index}>
                <h6>恭喜[昵称] [手机号] 拍得XXX藏品，成交价xxx元</h6>
              </div>
            ))}
          </Slider>
          <div className="ewmcyd-container">
            <img src="http://odp22tnw6.bkt.clouddn.com/ewmcyd.jpg" />
            <h6>服务热线</h6>
            <h6>400-886-6563</h6>
          </div>
        </div>
      </WingBlank>
    )
  }
}
