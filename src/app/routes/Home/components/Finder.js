import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flex, WingBlank } from 'antd-mobile'
import Timer from '../../../components/Timer'
import StandLink from '../../../components/StandLink'
import './finder.less'
const FlexItem = Flex.Item
export default class Finder extends Component {
  static propTypes = {
    auction: PropTypes.object,
  }

  render() {
    const { auction } = this.props
    return (
      <WingBlank size="sm">
        <Flex className="finder-container">
          <FlexItem className="finder-item-container right-line">
            {auction ? <StandLink to="/auction">
              <h5>专场拍卖</h5>
              <p>{auction.startTime > new Date().getTime()?'暂未开拍':<Timer endTime={auction.endTime} />}</p>
              <div>
                <img src={auction.imageUrl} />
              </div>
            </StandLink> : <div>
                <p>暂无拍卖会</p>
                <p>敬请期待</p>
              </div>}
          </FlexItem>
          <div className="finder-item-container right-panel">
            <StandLink to="/commodities" block>
              <Flex className="bottom-line">
                <FlexItem>
                  <h5>精品推荐</h5>
                  <p>精品中的精品</p>
                  <p>你值得拥有</p>
                </FlexItem>
                <FlexItem>
                  <img src='http://odp22tnw6.bkt.clouddn.com/v2/ccas/img-store.png' />
                </FlexItem>
              </Flex>
            </StandLink>
            <StandLink to="http://www.chenxiculture.cn/Shop/index/sid/8001283.html" out={true} block>
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
            </StandLink>
          </div>
        </Flex>
      </WingBlank>
    )
  }
}