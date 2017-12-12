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
      vertical: true,
    }
    return (
      <WingBlank size="sm" className="winner-slider-container">
        <h3>幸运大咖</h3>
        <div className="winner-slider-container-panel">
          <Slider {...settings}>
            {winners.map((value, index) => {
              const { nickname, phone, price, name } = value
              let phoneLabel = phone.substr(0, 3) + '****' + phone.substr(7, 11)
              return <div key={'winner' + index}>
                <span style={{fontSize:12}}>恭喜[{nickname}] [{phoneLabel}] 拍得[{name}]，成交价{price}元</span>
              </div>
            })}
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
