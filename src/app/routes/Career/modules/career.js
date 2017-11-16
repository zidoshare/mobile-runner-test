import { get, handlePage } from '../../../Util'
import apiUrl from '../../../apiUrl'
const CAREER_DATA_LOADING = 'CAREER_DATA_LOADING'
const RECEIVE_DATA = 'RECEIVE_DATA'
export const loadData = (condition) => (dispatch) => {
  dispatch({
    type: CAREER_DATA_LOADING,
    loading: true,
  })
  get(apiUrl.selectCareer, condition).then(data => {
    const { records } = data
    dispatch({
      type: RECEIVE_DATA,
      data: records,
      pagination: handlePage(data)
    })
  }).catch(() => {
    dispatch({
      type: CAREER_DATA_LOADING,
      loading: false,
    })
  })
}


const ACTION_HANDLERS = {
  [CAREER_DATA_LOADING]: (state, action) => (Object.assign(state, {
    loading: action.loading
  })),
  [RECEIVE_DATA]: (state, action) => (Object.assign(state, {
    data: action.data,
    pagination: action.pagination
  }))
}

const initialState = {
  loading: false,
  data: [],
  pagination: handlePage()
}

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
