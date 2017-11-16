import { get, post } from '../../../Util'
import apiUrl from '../../../apiUrl'
import { push } from 'react-router-redux'
import { transBeginTo } from '../../../reducers'
const COM_LOAD_BASE = 'COM_LOAD_BASE'
const COM_LOAD_INFO = 'COM_LOAD_INFO'
const COM_SUBMIT_ADD = 'COM_SUBMIT_ADD'

export const loadCommodity = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_BASE,
    loading: true,
  })
  get(apiUrl.commodityUrl, {
    id,
  }).then(data => {
    dispatch({
      type: COM_LOAD_BASE,
      loading: false,
      commodity: data,
    })
  }).catch(() => {
    dispatch({
      type: COM_LOAD_BASE,
      loading: false,
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
  post(apiUrl.addPriceUrl + `?commodityId=${commodityId}&addPrice=${addPrice}&currentPrice=${currentPrice}`).then(() => {
    dispatch({
      type: COM_SUBMIT_ADD,
      subLoading: false,
    })
  }).catch(err => {
    dispatch({
      type: COM_SUBMIT_ADD,
      subLoading: false,
    })
    const code = err.data.errorCode
    switch (code) {
      case 'phone':
        transBeginTo('/personInfo')
        break
      case 'address':
        transBeginTo('/address')
        break
      case 'bond':
        transBeginTo('/bond')
        break
    }
  })
}

const ACTION_HANDLERS = {
  [COM_LOAD_BASE]: (state, action) => ({ ...state, ...action }),
  [COM_LOAD_INFO]: (state, action) => ({ ...state, ...action }),
  [COM_SUBMIT_ADD]: (state, action) => ({ ...state, ...action }),
}

const initialState = {
  loading: true,
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}