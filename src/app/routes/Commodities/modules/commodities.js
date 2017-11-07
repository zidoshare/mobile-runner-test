const COM_LOAD_ROOTS = 'COM_LOAD_TYPES'
const COM_LOAD_COMMODITIES = 'COM_LOAD_COMMODITIES'
import {get} from '../../../Util'
import apiUrl from '../../../apiUrl'

export const loadRoots = () => dispatch => {
  get(apiUrl.typesUrl).then(json => {
    if (json.success) {
      dispatch({
        type: COM_LOAD_ROOTS,
        data: json.data,
      })
    }
  })
}

export const loadCommodities = (type,currentPage) => dispatch => {
  get(apiUrl.commoditiesUrl, {
    currentPage,
    type,
  }).then(json => {
    if (json.success) {
      dispatch({
        type: COM_LOAD_COMMODITIES,
        condition:{
          type,
        },
        data: json.data.records,
        page: json.data,
      })
    }
  })
}

const ACTION_HANDLERS = {
  [COM_LOAD_ROOTS]: (state, action) => ({...state, types: action.data}),
  [COM_LOAD_COMMODITIES]: (state, action) => {
    let result = state.types.find(t => t.id === action.condition.type)
    if(!result){
      return state
    }
    if (!result.page || action.page.current > result.page.current) {
      if(!result.commodities){
        result.commodities = []
      }
      result.commodities = result.commodities.concat(action.data)
      
      result.page = action.page
      result.initialed = true
      return {
        types:[...state.types]
      }
    } else {
      return state
    }
  },
}

const initialState = {
  types:[],
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}