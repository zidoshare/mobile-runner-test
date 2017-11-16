const AUCTION_LOAD_ROOTS = 'AUCTION_LOAD_ROOTS'
const AUCTION_LOAD_COMMODITIES = 'AUCTION_LOAD_COMMODITIES'
import { get } from '../../../Util'
import apiUrl from '../../../apiUrl'

export const loadRoots = () => dispatch => {
  get(apiUrl.typesUrl).then(data => {
    dispatch({
      type: AUCTION_LOAD_ROOTS,
      data: data,
    })
  })
}

export const loadCommodities = (type, currentPage) => dispatch => {
  return get(apiUrl.commoditiesUrl, {
    currentPage,
    type,
    auction: 1,
  }).then(data => {
    const action = {
      type: AUCTION_LOAD_COMMODITIES,
      condition: {
        type,
      },
      data: data.records,
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

const ACTION_HANDLERS = {
  [AUCTION_LOAD_ROOTS]: (state, action) => ({ ...state, types: action.data }),
  [AUCTION_LOAD_COMMODITIES]: (state, action) => {
    let result = state.types.find(t => t.id === action.condition.type)
    if (!result) {
      return state
    }
    if (!result.page || action.page.current > result.page.current) {
      if (!result.commodities) {
        result.commodities = []
      }
      result.commodities = result.commodities.concat(action.data)
      result.page = action.page
      result.initialed = true
      result.hasMore = (action.page.current < action.page.pages - 1)
      return {
        types: [...state.types]
      }
    } else {
      return state
    }
  },
}

const initialState = {
  types: [],
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}