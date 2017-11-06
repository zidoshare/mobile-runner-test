import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flex, WingBlank } from 'antd-mobile'
import Timer from '../../../components/Timer'
import './finder.less'
export default class Finder extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
  }

  render() {
    const { endTime, imageUrl } = this.props.auction
    return (
      <WingBlank size="sm">
        <Flex className="finder-container">
          <Flex.Item className="finder-item-container right-line">
            <h5>专场拍卖</h5>
            <p><Timer endTime={endTime} /></p>
            <div>
              <img src={imageUrl} />
            </div>
          </Flex.Item>
          <div className="finder-item-container right-panel">
            <Flex className="bottom-line">
              <Flex.Item>
                <h5>精品推荐</h5>
                <p>精品中的精品</p>
                <p>你值得拥有</p>
              </Flex.Item>
              <Flex.Item>
                <img src='http://odp22tnw6.bkt.clouddn.com/2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg' />
              </Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item>
                <h5>藏品自营</h5>
                <p>限时限量抢购</p>
                <p>各类精品好货</p>
              </Flex.Item>
              <Flex.Item>
                <img src='http://odp22tnw6.bkt.clouddn.com/2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg' />
              </Flex.Item>
            </Flex>
          </div>
        </Flex>
      </WingBlank>
    )
  }
}