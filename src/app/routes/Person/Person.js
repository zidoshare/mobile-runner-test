import React, { Component } from 'react'
import ChildNavBar from '../../components/ChildNavBar'
import { Grid, Toast, ActivityIndicator } from 'antd-mobile'
import PropTypes from 'prop-types'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'
import './Person.less'
const PersonNav = [{
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-person.png',
  text: '个人资料',
  path: '/personInfo'
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-collection.png',
  text: '我的收藏',
  path:'/follow'
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-my-auction.png',
  text: '我的拍卖',
  toast: {
    type: 'fail',
    text: '暂未开放',
  }
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-help.png',
  text: '帮助',
  toast: {
    type: 'fail',
    text: '暂未开放',
  }
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-my-address.png',
  text: '收货地址',
  path: '/address',
}, {
  icon: 'http://odp22tnw6.bkt.clouddn.com/v2/ccas/icon-history.png',
  text: '历史记录',
  toast: {
    type: 'fail',
    text: '暂未开放',
  }
}]

const colors = [
  '#C5CF86',
  '#F48093',
  '#7ACAD5',
  '#C5CF86',
  '#F48093',
  '#7ACAD5',
]
export default class Person extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      navStyle: {
        backgroundColor: '#E36849', color: 'white'
      },
      info: {
        nickname: '------',

      },
      loading: true,
    }
  }
  componentDidMount() {
    this.initialBackground()
    this.loadInfo()
  }

  loadInfo = () => {
    this.setState({
      loading: true,
    })
    get(apiUrl.myMsgUrl).then(data => {
      this.setState({
        loading: false,
        info: data,
      })
    })
  }

  initialBackground() {
    const nodeList = document.querySelector('.head-container > .random-bg-container').childNodes
    const maxWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
    nodeList.forEach((node) => {
      node.style.position = 'absolute'
      node.style.width = 40 + 'px'
      node.style.height = 40 + 'px'
      node.style.backgroundColor = 'white'
      node.style.opacity = 0.3
      node.style.left = maxWidth / 2 + (Math.random() - 0.5) * maxWidth + 'px'
      node.style.top = 150 + (Math.random() - 0.5) * 300 + 'px'
      node.style.borderRadius = Math.random() * 25 + 'px'
    })
  }
  goto = (el) => {
    if (el.toast) {
      const func = Toast[el.toast.type]
      func(el.toast.text, 1, null, false)
    }
    if (el.path) {
      this.props.history.push(el.path)
    }
  }
  render() {
    const { info } = this.state
    return (
      <div className="person-container">
        <ChildNavBar title="个人中心" style={this.state.navStyle} rightContent={[]} toHome={false} />
        <div>
          <ActivityIndicator
            toast
            text="正在获取用户信息..."
            animating={this.state.loading}
          />
          <div className="head-container">
            <div className="random-bg-container">
            </div>
            <div className="head-ins" style={{ backgroundImage: `url(${info.headportrait})` }}>
            </div>
            <div className="head-name-panel ellipsis">{info.nickname}</div>
          </div>
        </div>
        <Grid data={PersonNav} columnNum={3} onClick={this.goto} hasLine renderItem={(el, index) => (
          <div className="am-grid-item-inner-content column-num-3">
            <div className="person-grid-item-icon-container" style={{ background: `${colors[index]}` }}>
              <img src={el.icon} />
            </div>
            <div className="am-grid-text">{el.text}</div>
          </div>
        )} />
      </div>
    )
  }
}
