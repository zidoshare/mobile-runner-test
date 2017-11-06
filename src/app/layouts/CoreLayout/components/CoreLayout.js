import React from 'react'
import {PropTypes} from 'prop-types'
import {Layout, Menu, Icon} from 'antd'
import logo from '../../../../image/cyd-logo.png'
import './coreLayout.scss'
import {Link} from 'react-router-dom'

const {Header, Content, Footer, Sider} = Layout
const {SubMenu} = Menu
const MenuItem = Menu.Item

class CoreLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  onCollapse(collapsed) {
    const {collapse} = this.props
    collapse(collapsed)
  }

  componentDidMount() {
    const {location, changeMenu} = this.props
    changeMenu(location.pathname)
    //移除 .no-link下的所有链接跳转
    document.querySelector('.no-link').addEventListener('click', function (e) {
      e.preventDefault()
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname !== this.props.location.pathname){
      this.props.changeMenu(nextProps.location.pathname)
    }
  }
  linkTo(item) {
    const {push, changeMenu} = this.props
    push(item.key)
    changeMenu(location.pathname)
  }

  resolveMenu(menus, deep, block) {
    const menuItems = menus.map((value, index) => {
      if (value instanceof Array) {
        return this.resolveMenu(value, deep + 1, index)
      }
      return <MenuItem key={value.path}>
        {value.component ? value.component : <Link to={value.path}>
          { (typeof value.icon === 'string') ? <Icon type={value.icon}/> : value.icon}
          {(typeof value.title === 'string')? <span>{value.title}</span> : value.title}
        </Link>}
      </MenuItem>
    })
    if (deep > 0) {
      return <SubMenu key={block + 'sub' + deep}>
        {menuItems}
      </SubMenu>
    }
    return menuItems
  }
  render() {
    const menus = this.resolveMenu(this.props.menus, 0, 0)
    const {collapsed, selectedKeys} = this.props.core
    return (
      <Layout className="cyd-all-container">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse.bind(this)}
        >
          <div className="logo-container">
            <img src={logo}/>
            {collapsed ? null : <span>创源地管理平台</span>}
          </div>
          <Menu theme="dark" mode="inline" className="no-link" selectedKeys={selectedKeys}
                onClick={this.linkTo.bind(this)}>
            {menus}
          </Menu>
        </Sider>
        <Layout>
          <Header className="main-header"/>
          <Content style={{margin: '0 16px'}}>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            ©2017 成都创源地文化传播有限公司. All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    )
  }
}


CoreLayout.propTypes = {
  location: PropTypes.object.isRequired,
  core: PropTypes.object.isRequire,
  collapse: PropTypes.func.isRequired,
  changeMenu: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  children: PropTypes.any,
  menus: PropTypes.array.isRequired,
}

export const Menus = (props) => {
  return props.children
}

export const Routes = (props) => {
  return props.children
}
export default CoreLayout
export {
  MenuItem,
  SubMenu,
}