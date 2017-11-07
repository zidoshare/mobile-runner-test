import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flex, WingBlank } from 'antd-mobile'
import Timer from '../../../components/Timer'
import './finder.less'
const FlexItem = Flex.Item
export default class Finder extends Component {
  static propTypes = {
    auction: PropTypes.object.isRequired,
  }

  render() {
    const { endTime, imageUrl } = this.props.auction
    return (
      <WingBlank size="sm">
        <Flex className="finder-container">
          <FlexItem className="finder-item-container right-line">
            <h5>专场拍卖</h5>
            <p><Timer endTime={endTime} /></p>
            <div>
              <img src={imageUrl} />
            </div>
          </FlexItem>
          <div className="finder-item-container right-panel">
            <Flex className="bottom-line">
              <FlexItem>
                <h5>精品推荐</h5>
                <p>精品中的精品</p>
                <p>你值得拥有</p>
              </FlexItem>
              <FlexItem>
                <img src='http://odp22tnw6.bkt.clouddn.com/2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg' />
              </FlexItem>
            </Flex>
            <Flex>
              <FlexItem>
                <h5>藏品自营</h5>
                <p>限时限量抢购</p>
                <p>各类精品好货</p>
              </FlexItem>
              <FlexItem>
                <img src='http://odp22tnw6.bkt.clouddn.com/2017/10/11/163dcfc6-58aa-4466-adcc-66ce761e6e57.jpg' />
              </FlexItem>
            </Flex>
          </div>
        </Flex>
      </WingBlank>
    )
  }
}