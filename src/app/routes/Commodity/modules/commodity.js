import { get, post, pay } from '../../../Util'
import apiUrl from '../../../apiUrl'
import React from 'react'
import { transBeginTo } from '../../../reducers'
import { Toast, Modal } from 'antd-mobile'
const COM_LOAD_BASE = 'COM_LOAD_BASE'
const COM_LOAD_INFO = 'COM_LOAD_INFO'
const COM_SUBMIT_ADD = 'COM_SUBMIT_ADD'
const UPDATE_FOLLOW = 'UPDATE_FOLLOW'
const UPDATE_PRICE = 'UPDATE_PRICE'

export const loadCommodity = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_BASE,
    loading: true,
  })
  return get(apiUrl.commodityUrl, {
    id,
  }).then(data => {
    dispatch({
      type: COM_LOAD_BASE,
      loading: false,
      commodity: data,
      updateTime: 0,
      updatedNum: 0,
    })
  }).catch(() => {
    dispatch({
      type: COM_LOAD_BASE,
      loading: false,
      updateTime: 0,
      updatedNum: 0,
    })
  })
}

export const loadInfo = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_INFO,
    infoLoading: true,
  })
  get(apiUrl.infoUrl + '/0', {
    id,
  }).then(data => {
    dispatch({
      type: COM_LOAD_INFO,
      infoLoading: false,
      info: data,
    })
  }).catch(() => {
    dispatch({
      type: COM_LOAD_INFO,
      infoLoading: false,
      info: null,
    })
  })
}

export const loadDetail = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_INFO,
    detailLoading: true,
  })
  get(apiUrl.infoUrl + '/1', {
    id,
  }).then(data => {
    dispatch({
      type: COM_LOAD_INFO,
      detailLoading: false,
      detail: data,
    })
  }).catch(() => {
    dispatch({
      type: COM_LOAD_INFO,
      detailLoading: false,
      detail: null,
    })
  })
}

export const submit = (commodityId, addPrice, currentPrice) => dispatch => {
  dispatch({
    type: COM_SUBMIT_ADD,
    subLoading: true,
  })
  get(apiUrl.isReadProtocolUrl)
    .then((code) => {
      if (code == 0 || code == 1) {
        return new Promise((resolve, reject) => {
          Modal.alert('服务协议', <p>在缴纳保证金前，您应该确认并同意用户协议，以保障您的权益<a href="http://api.chuangyuandi.net.cn/ccas-protocol.htm" target="_blank">点击阅读服务协议</a></p>, [
            { text: '拒绝', onPress: reject, style: 'default' },
            { text: '同意', onPress: resolve },
          ])
        })
      }
    })
    .then(() => {
      return get(apiUrl.agreeUrl, {
        code: 2
      })
    }, () => {
      get(apiUrl.agreeUrl, {
        code: 0,
      })
      dispatch({
        type: COM_SUBMIT_ADD,
        subLoading: false,
      })
      throw new Error('用户拒绝协议')
    }).then(() => {
      return post(apiUrl.addPriceUrl + `?commodityId=${commodityId}&addPrice=${addPrice}&currentPrice=${currentPrice}`).then(() => {
        loadPrice(commodityId)(dispatch)
      }).catch(err => {
        let code = 'other'
        if (err && err.data && err.data.errorCode)
          code = err.data.errorCode
        switch (code) {
          case 'phone':
            return new Promise((resolve, reject) => {
              Modal.alert('注意', '检测到你未绑定手机号，请点击确定以绑定手机号', [
                { text: '取消', onPress: reject, style: 'default' },
                { text: '确定', onPress: resolve },
              ])
            }).then(() => {
              transBeginTo('/personInfo')
            })
          case 'address':
            return new Promise((resolve, reject) => {
              Modal.alert('注意', '检测到你没有默认收货地址，请点击确定以添加默认收货地址', [
                { text: '取消', onPress: reject, style: 'default' },
                { text: '确定', onPress: resolve },
              ])
            }).then(() => {
              transBeginTo('/address')
            })
          case 'bond':
            return post(`${apiUrl.payBondUrl}?commodityId=${commodityId}&payMethod=WECHAT`)
              .then((result) => {
                return pay(result.data).then(() => {
                  transBeginTo({
                    pathname: `/payResult/${result.orderId}`,
                    search: '?code=wait-result'
                  })
                }, (res) => {
                  Toast.fail(res.message)
                })
              })
          default:
            dispatch({
              type: COM_SUBMIT_ADD,
              subLoading: false,
            })
        }
      }).then(() => {
        dispatch({
          type: COM_SUBMIT_ADD,
          subLoading: false,
        })
      })
    })
}

export const loadFollow = (commodityId) => dispatch => {
  get(apiUrl.showFollowUrl + `?commodityId=${commodityId}`).then((data) => {
    dispatch({
      type: UPDATE_FOLLOW,
      isFollow: data.follow,
    })
  })
}

export const follow = (commodityId) => dispatch => {
  dispatch({
    type: UPDATE_FOLLOW,
    isFollow: true,
  })
  post(apiUrl.followUrl + `?commodityId=${commodityId}`).catch(() => {
    dispatch({
      type: UPDATE_FOLLOW,
      isFollow: false,
    })
  })
}
export const unFollow = (commodityId) => dispatch => {
  dispatch({
    type: UPDATE_FOLLOW,
    isFollow: false,
  })
  post(apiUrl.unFollowUrl + `?commodityId=${commodityId}`).catch(() => {
    dispatch({
      type: UPDATE_FOLLOW,
      isFollow: true,
    })
  })
}

export const loadPrice = (id) => dispatch => {
  return get(apiUrl.priceUrl, { id }).then(data => {
    dispatch({
      type: UPDATE_PRICE,
      data,
    })
    return data
  })
}
const ACTION_HANDLERS = {
  [COM_LOAD_BASE]: (state, action) => ({ ...state, ...action }),
  [COM_LOAD_INFO]: (state, action) => ({ ...state, ...action }),
  [COM_SUBMIT_ADD]: (state, action) => ({ ...state, ...action }),
  [UPDATE_FOLLOW]: (state, action) => ({ ...state, ...action }),
  [UPDATE_PRICE]: (state, action) => {
    let { commodity } = state
    const nextPrice = action.data.currentPrice
    const nowPrice = state.commodity.currentPrice
    commodity = {
      ...commodity,
      ...action.data,
    }
    if (nextPrice != nowPrice) {
      return {
        ...state,
        commodity,
        updatedNum: nextPrice - nowPrice,
        updateTime: state.updateTime + 1,
      }
    }
    else
      return state
  }
}

const initialState = {
  loading: true,
  isFollow: false,
  updateTime: 0,
  subLoading: false,
  updatedNum: 0,
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}