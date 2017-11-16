const FOLLOW_LOAD_COMMODITIES = 'FOLLOW_LOAD_COMMODITIES'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'

export const loadCommodities = (currentPage) => (dispatch, getState) => {

  if (!getState().page || currentPage > getState().page.current) {
    dispatch({
      type: FOLLOW_LOAD_COMMODITIES,
      loading: true,
    })
    return get(apiUrl.followListUrl, {
      currentPage,
    }).then(data => {
      const action = {
        type: FOLLOW_LOAD_COMMODITIES,
        commodities: data.records,
        loading: false,
      }
      const page = {
        ...data,
      }
      delete page.records
      action.page = page
      dispatch(action)
    })
  }
}

const ACTION_HANDLERS = {
  [FOLLOW_LOAD_COMMODITIES]: (state, action) => {
    if (action.loading) {
      return {
        ...state,
        ...action,
      }
    }
    if (!state.page || action.page.current > state.page.current) {
      let result = state.commodities || []
      result.concat(action.commodities)
      return {
        ...state,
        ...action,
        commodities: result,
      }
    }
    return state
  }
}

const initialState = {
  commodities: [],
  loading: false,
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}