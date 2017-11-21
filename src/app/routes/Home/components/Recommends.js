import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Flex, WingBlank } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Timer from '../../../components/Timer'
import './Recommends.less'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const FlexItem = Flex.Item
export default class Recommends extends Component {
  static propTypes = {
    recommends: PropTypes.array.isRequired,
  }

  render() {
    const { recommends } = this.props
    let settings = {
      swipeToSlide: true,
      speed: 500,
      arrows: false,
      slidesToShow: 3,
      className: 're-img-container',
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    return (
      <WingBlank size="sm">
        <Flex className="recom-container clear-fix">
          <div className="pull-left">
            <h3 className="verticle-title">
              今日推荐
          </h3>
          </div>
          <FlexItem>
            {recommends.length > 0 ? <Slider {...settings}>
              {recommends.map((value, index) => (
                <div key={'recom' + index}>
                  <Link to={`/commodity/${value.id}`}>
                    <img src={value.head?`${value.head}${value.url}`:'http://odp22tnw6.bkt.clouddn.com/v2/ccas/default-no-pic.png'} />
                    <h5>{value.name}</h5>
                    <p>{value.price}</p>
                    <p><Timer endTime={value.endTime} /></p>
                  </Link>
                </div>
              ))}
            </Slider> : <p className="no-data">暂无数据</p>}
          </FlexItem>
        </Flex>
      </WingBlank>
    )
  }
}
