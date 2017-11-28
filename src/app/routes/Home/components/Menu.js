import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank, Grid, Badge } from 'antd-mobile'
import './menu.less'
import { withRouter } from 'react-router-dom'
const menu = [{
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-auction.png',
  text: '拍卖',
  span: '出价得拍品',
  path: '/commodities'
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-to.png',
  text: '送拍',
  span: '专家鉴定',
  path: '/send',
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-notice.png',
  text: '消息',
  span: '通知公告',
  path: '/messages',
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-my.png',
  text: '我的',
  span: '个人中心',
  path: '/person?returnPath=/',
}]

class Menu extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
  }
  goto = (el) => {
    this.props.history.push(el.path)
  }
  render() {
    const { count } = this.props
    if (count)
      menu[2].extra = <Badge dot />
    return (
      <div>
        <WingBlank size="sm">
          <Grid data={menu} columnNum={4} renderItem={(el) => (
            <div className="hm-menu-item">
              <div className="hm-menu-top">
                <img src={el.icon} className="hm-item-ic" />
                <div className="hm-menu-extra">
                  {el.extra}
                </div>
                <span className="hm-item-title">{el.text}</span>
              </div>
              <div className="hm-item-ins">{el.span}</div>
            </div>

          )} onClick={this.goto} />
        </WingBlank>
      </div>
    )
  }
}

export default withRouter(Menu)