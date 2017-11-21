const MAU_LOAD_COMMODITIES = 'MAU_LOAD_COMMODITIES'
import { get } from '../../Util'
import apiUrl from '../../apiUrl'

export const loadCommodities = (type, currentPage) => dispatch => {
  dispatch({
    type: MAU_LOAD_COMMODITIES,
    condition: {
      type,
    },
    loading: true,
    initialed: true,
  })
  return get(apiUrl.myAuctionUrl, {
    currentPage,
    type,
  }).then(data => {
    const action = {
      type: MAU_LOAD_COMMODITIES,
      condition: {
        type,
      },
      data: data.records,
      loading: false,
      initialed: true,
    }
    const page = {
      ...data,
    }
    delete page.records
    action.page = page
    dispatch(action)
  })
}

const ACTION_HANDLERS = {
  [MAU_LOAD_COMMODITIES]: (state, action) => {
    let result = state.types.find(t => t.id === action.condition.type)
    if (!result) {
      return state
    }
    if (action.loading) {
      result.loading = action.loading
      return {
        types: [...state.types]
      }
    }
    if (!result.page || action.page.current > result.page.current) {
      if (!result.commodities) {
        result.commodities = []
      }
      result.commodities = result.commodities.concat(action.data)
      result.page = action.page
      result.initialed = true
      result.hasMore = (action.page.current < action.page.pages - 1)
      result.loading = action.loading
      return {
        types: [...state.types]
      }
    } else if (action.page.current <= result.page.current) {
      if (!result.commodities) {
        result.commodities = []
      }
      result.commodities = action.data
      result.page = action.page
      result.initialed = true
      result.hasMore = (action.page.current < action.page.pages - 1)
      result.loading = action.loading
      return {
        types: [...state.types]
      }
    } else {
      return state
    }
  },
}

const initialState = {
  types: [{
    id: 1,
    name: '竞拍成功',
    loading: true,
  }, {
    id: 2,
    name: '已参与',
    loading: true,
  }],
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}