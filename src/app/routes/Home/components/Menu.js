import React, { Component } from 'react'
import { WingBlank, Grid } from 'antd-mobile'
import './menu.less'

const menu = [{
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-auction.png',
  text: '拍卖',
  span: '出价得拍品',
},{
  icon:'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-to.png',
  text:'送拍',
  span:'专家鉴定'
},{
  icon:'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-notice.png',
  text:'消息',
  span:'通知公告',
},{
  icon:'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-my.png',
  text:'我的',
  span:'个人中心'
}]

export default class Menu extends Component {
  render() {
    return (
      <div>
        <WingBlank size="sm">
          <Grid data={menu} columnNum={4} hasLine={false} renderItem={(el) => (
            <div className="hm-menu-item">
              <div className="hm-menu-top">
                <img src={el.icon} className="hm-item-ic"/>
                <span className="hm-item-title">{el.text}</span>
              </div>
              <div className="hm-item-ins">{el.span}</div>
            </div>
          )} />
        </WingBlank>
      </div>
    )
  }
}