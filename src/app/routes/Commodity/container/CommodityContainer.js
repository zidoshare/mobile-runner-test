import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Banner from '../../../components/Banner'
import ChildNavBar from '../../../components/ChildNavBar'
import Timer from '../../../components/Timer'
import { WhiteSpace, List, InputItem, ActivityIndicator, Flex, Button, Picker } from 'antd-mobile'
const FlexItem = Flex.Item
const ListItem = List.Item
import { connect } from 'react-redux'
import { loadCommodity, loadDetail, loadInfo } from '../modules/commodity'
import { createForm } from 'rc-form'
import './commodity.less'
class CommodityContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    loadCommodity: PropTypes.func.isRequired,
    com: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    loadInfo: PropTypes.func.isRequired,
    loadDetail: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.loadCommodity(id)
    this.props.loadInfo(id)
    this.props.loadDetail(id)
  }

  render() {
    const { commodity, loading, infoLoading, info, detailLoading, detail } = this.props.com
    const { getFieldProps } = this.props.form
    
    return (
      <div className="commodity-container">
        {!loading ? <div>
          <ChildNavBar title={commodity.name} />
          <div className="commodity-content-wrapper">
            <Banner banner={commodity.images.map(value => (`${value.head}${value.url}`))} />
            <WhiteSpace size="sm" />
            <div className="com-op-container">
              <List>
                <ListItem>
                  <Flex>
                    <FlexItem className="ellipsis"><h4>{commodity.name}</h4></FlexItem>
                    <FlexItem className="ellipsis">倒计时：<Timer endTime={commodity.endTime} /></FlexItem>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex>
                    <FlexItem><h5 className="ellipsis">当前价：￥{commodity.price}</h5></FlexItem>
                    <FlexItem className="ellipsis">出价{commodity.competition}次</FlexItem>
                  </Flex>
                </ListItem>
                <InputItem
                  {...getFieldProps('money2', {
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
                  placeholder="请输入加价金额"
                  ref={el => this.customFocusInst = el}
                  clear
                >加价金额</InputItem>
                <ListItem>
                  <Picker data={commodity.basePrice.split(',').map(value=>({
                    value:value,
                    label:'加价'+value+'元',
                  }))} cols={1} {...getFieldProps('district3') } className="forss">
                    <List.Item arrow="horizontal">选择加价金额</List.Item>
                  </Picker>
                </ListItem>
                <ListItem>
                  <Button type="primary">加价竞拍</Button>
                </ListItem>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(CommodityContainer))