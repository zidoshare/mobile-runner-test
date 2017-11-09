import { get } from '../../../Util'
import apiUrl from '../../../apiUrl'
const COM_LOAD_BASE = 'COM_LOAD_BASE'
const COM_LOAD_INFO = 'COM_LOAD_INFO'

export const loadCommodity = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_BASE,
    loading: true,
  })
  get(apiUrl.commodityUrl, {
    id,
  }).then(json => {
    if (json.success) {
      dispatch({
        type: COM_LOAD_BASE,
        loading: false,
        commodity: json.data,
      })
    } else {
      dispatch({
        type: COM_LOAD_BASE,
        loading: false,
      })
    }
  })
}

export const loadInfo = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_INFO,
    infoLoading: true,
  })
  get(apiUrl.infoUrl + '/0', {
    id,
  }).then(json => {
    if (json.success) {
      dispatch({
        type: COM_LOAD_INFO,
        infoLoading: false,
        info: json.data,
      })
    } else {
      dispatch({
        type: COM_LOAD_INFO,
        infoLoading: false,
        info:null,
      })
    }
  })
}

export const loadDetail = (id) => dispatch => {
  dispatch({
    type: COM_LOAD_INFO,
    detailLoading: true,
  })
  get(apiUrl.infoUrl + '/1', {
    id,
  }).then(json => {
    if (json.success) {
      dispatch({
        type: COM_LOAD_INFO,
        detailLoading: false,
        detail: json.data,
      })
    } else {
      dispatch({
        type: COM_LOAD_INFO,
        detailLoading: false,
        detail:null,
      })
    }
  })
}

const ACTION_HANDLERS = {
  [COM_LOAD_BASE]: (state, action) => ({ ...state, ...action }),
  [COM_LOAD_INFO]: (state, action) => ({ ...state, ...action })
}

const initialState = {
  loading: true,
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}