import { NavBar, Icon } from 'antd-mobile'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
class ChildNavBar extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    title: PropTypes.node.isRequired,
    rightContent: PropTypes.array,
    icon: PropTypes.node,
    mode: PropTypes.string,
    onLeftClick: PropTypes.func,
  }
  static defaultProps = {
    rightContent: [
      <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
      <Icon key="1" type="ellipsis" />,
    ],
    icon: <Icon type="left" />,
    mode: 'light',
  }

  render() {

    const { title, rightContent, icon, mode, onLeftClick } = { ...this.props }
    const props = {
      rightContent, icon, mode, onLeftClick,
    }
    return <NavBar
      {...props}
      onLeftClick={this.props.history.goBack}
    >{title}</NavBar>
  }
}

export default withRouter(ChildNavBar)