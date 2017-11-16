import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Banner from '../../../components/Banner'
import ChildNavBar from '../../../components/ChildNavBar'
import Timer from '../../../components/Timer'
import { WhiteSpace, List, InputItem, ActivityIndicator, Flex, Button, Picker } from 'antd-mobile'
const FlexItem = Flex.Item
const ListItem = List.Item
import { connect } from 'react-redux'
import { loadCommodity, loadDetail, loadInfo, submit } from '../modules/commodity'
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
    submit: PropTypes.func.isRequired,
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
  render() {
    const { commodity, loading, infoLoading, info, detailLoading, detail } = this.props.com
    const { getFieldProps } = this.props.form

    return (
      <div className="commodity-container">
        {!loading ? <div>
          <ChildNavBar title={commodity.name} toHome={true} />
          <div className="commodity-content-wrapper">
            <Banner banner={commodity.images.map(value => (`${value.head}${value.url}`))} />
            <div className="com-op-container">
              <List>
                <ListItem>
                  <Flex>
                    <FlexItem className="ellipsis"><span>{commodity.name}</span></FlexItem>
                    <FlexItem className="ellipsis" style={{ fontSize: 12 }}>距结束：<Timer endTime={commodity.endTime} /></FlexItem>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex>
                    <FlexItem><span className="ellipsis">当前价：￥{commodity.price}</span></FlexItem>
                    <FlexItem className="ellipsis no-data">出价{commodity.competition}次</FlexItem>
                  </Flex>
                </ListItem>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(CommodityContainer))