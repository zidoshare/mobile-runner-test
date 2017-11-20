import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Banner from '../../../components/Banner'
import ChildNavBar from '../../../components/ChildNavBar'
import Timer from '../../../components/Timer'
import { List, InputItem, ActivityIndicator, Flex, Button, Picker } from 'antd-mobile'
const FlexItem = Flex.Item
const ListItem = List.Item
import { connect } from 'react-redux'
import { loadCommodity, loadDetail, loadInfo, submit, follow, unFollow, loadFollow } from '../modules/commodity'
import { createForm } from 'rc-form'
import CustomIcon from '../../../components/CustomIcon'
import './commodity.less'
class CommodityContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loadCommodity: PropTypes.func.isRequired,
    com: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    loadInfo: PropTypes.func.isRequired,
    loadDetail: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    unFollow: PropTypes.func.isRequired,
    loadFollow: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      val: 3,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.loadCommodity(id)
    this.props.loadInfo(id)
    this.props.loadDetail(id)
    this.props.loadFollow(id)
  }
  onChange = (val) => {
    // console.log(val);
    this.setState({ val })
  }
  handleSubmit = () => {
    this.props.form.validateFields((error) => {
      if (!error) {
        const { commodity } = this.props.com
        this.props.submit(commodity.id, this.props.form.getFieldValue('money'), commodity.price)
      }
    })

  }

  updateFollow = () => {
    const { follow, unFollow } = this.props
    const { isFollow } = this.props.com
    const { commodity } = this.props.com
    if (isFollow) {
      unFollow(commodity.id)
    } else {
      follow(commodity.id)
    }
  }
  render() {
    const { commodity, loading, infoLoading, info, detailLoading, detail,isFollow } = this.props.com
    const { getFieldProps } = this.props.form

    return (
      <div className="commodity-container">
        {!loading ? <div>
          <ChildNavBar title={commodity.name} toHome={true} />
          <div className="commodity-content-wrapper">
            <Banner banner={commodity.images.length > 0 ?commodity.images.map(value => (`${value.head}${value.url}`)):['http://odp22tnw6.bkt.clouddn.com/v2/ccas/default-no-pic.png']}/>
            <div className="com-op-container">
              <Flex className="title-line">
                <FlexItem><span>{commodity.name}</span></FlexItem>
                <FlexItem style={{ fontSize: 12, whiteSpace: 'nowrap' }}>距结束：<Timer endTime={commodity.endTime} /></FlexItem>
                <div className="ic-text-btn" onClick={this.updateFollow}>
                  <CustomIcon type={isFollow?require('../../../../image/start-yes.svg'):require('../../../../image/start-no.svg')} />
                  <span>收藏</span>
                </div>
              </Flex>
              <Flex className="title-line">
                <FlexItem><span className="ellipsis">当前价格：<span className="money color-primary">{commodity.price}</span></span></FlexItem>
                <FlexItem className="ellipsis no-data">出价{commodity.competition}次</FlexItem>
              </Flex>
              <div className="c-title-line">
                <span className="ellipsis">保证金：<span className="money color-primary">{commodity.bond}</span></span>
              </div>
              <List>
                <InputItem
                  {...getFieldProps('money', {
                    normalize: (v, prev) => {
                      if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                        if (v === '.') {
                          return '0.'
                        }
                        return prev
                      }
                      return v
                    },
                  }) }
                  type='money'
                  placeholder="点击输入加价金额"
                  clear
                >加价金额</InputItem>
                <ListItem>
                  <Button type="primary" onClick={this.handleSubmit}>加价竞拍</Button>
                </ListItem>
                <Picker data={commodity.basePrice.split(',').map(value => ({
                  value: value,
                  label: '加价' + value + '元',
                }))} cols={1} className="forss" onChange={(val) => {
                  this.props.form.setFieldsValue({
                    money: val
                  })
                }}>
                  <ListItem arrow="horizontal">快捷加价</ListItem>
                </Picker>
                <ListItem>
                  <h2>
                    拍品信息
                  </h2>
                  <div>
                    {infoLoading ? <ActivityIndicator text="正在加载" /> : <div dangerouslySetInnerHTML=
                      {{ __html: info }}>
                    </div>}
                  </div>
                </ListItem>
                <ListItem>
                  <h2>
                    细节展示
                  </h2>
                  <div>
                    {detailLoading ? <ActivityIndicator text="正在加载" /> : <div dangerouslySetInnerHTML=
                      {{ __html: detail }}>
                    </div>}
                  </div>
                </ListItem>
              </List>
            </div>
          </div>
        </div> : <ActivityIndicator
            toast
            text="Loading..."
          />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  com: state.com
})

const mapDispatchToProps = {
  loadCommodity,
  loadDetail,
  loadInfo,
  submit,
  follow,
  unFollow,
  loadFollow,
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(CommodityContainer))