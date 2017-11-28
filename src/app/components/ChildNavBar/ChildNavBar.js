import { NavBar, Icon, ActionSheet } from 'antd-mobile'
import React from 'react'
import PropTypes from 'prop-types'
import CustomIcon from '../CustomIcon'
import { withRouter } from 'react-router-dom'
import { getQueryString } from '../../Util'
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let wrapProps
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  }
}
class ChildNavBar extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    title: PropTypes.node.isRequired,
    rightContent: PropTypes.array,
    icon: PropTypes.node,
    mode: PropTypes.string,
    onLeftClick: PropTypes.func,
    onSearch: PropTypes.func,
    style: PropTypes.object,
    toHome: PropTypes.bool.isRequired,
    fix: PropTypes.bool.isRequired,
    noTrans: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    icon: <Icon type="left" />,
    mode: 'light',
    fix: true,
    toHome: false,
    noTrans: false,
  }
  constructor(props) {
    super(props)
    this.state = {
      clicked: 'none',
    }
  }

  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
  }))

  componentWillMount() {
    this.returnPath = getQueryString('returnPath')
  }

  showShareActionSheet = () => {
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      title: '有好宝贝，分享给朋友吧',
      message: '该功能暂不可用',
      wrapProps,
    },
      (buttonIndex) => {
        this.setState({ clicked: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' })
      })
  }

  toHome = () => {
    this.props.history.replace('/')
  }
  toReturn = () => {
    // if (!this.props.noTrans && transBegining()) {
    //   return transAfter()
    // }
    if (this.props.onLeftClick) {
      return this.props.onLeftClick()
    }
    this.props.icon ? (this.returnPath ? this.props.history.push(this.returnPath) : this.props.history.goBack()) : null
  }
  render() {
    const { title, rightContent, icon, mode, onLeftClick, fix } = this.props
    const rc = [
      // <Icon key="1" type="ellipsis" onClick={this.showShareActionSheet} />,
    ]
    const props = {
      icon,
      mode,
      onLeftClick,
    }
    if (fix) {
      props.style = {
        ...this.props.style,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 999,
      }
    }
    let resultRightContent = rightContent || rc
    if (this.props.toHome) {
      resultRightContent = [<CustomIcon onClick={this.toHome} style={{ marginRight: 5 }} type={require('../../../image/home.svg')} key="nav-to-home" />].concat(resultRightContent)
    }
    return <div>
      <NavBar
        {...props}
        rightContent={resultRightContent}
        onLeftClick={this.toReturn}
      >{title}</NavBar>
    </div>
  }
}

export default withRouter(ChildNavBar)