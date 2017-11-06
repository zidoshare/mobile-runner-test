import {get,handlePage} from '../../../Util'
import apiUrl from '../../../apiUrl'
const NEWS_DATA_LOADING = 'NEWS_DATA_LOADING'
const RECEIVE_DATA = 'RECEIVE_DATA'
export const loadData = (condition) => (dispatch) => {
  dispatch({
    type:NEWS_DATA_LOADING,
    loading:true,
  })
  get(apiUrl.selectCareer,condition).then(result => {
    dispatch({
      type:NEWS_DATA_LOADING,
      loading:false,
    })
    if(result.success){
      const {data} = result
      const {records} = result.data
      dispatch({
        type:RECEIVE_DATA,
        data:records,
        pagination:handlePage(data)
      })
    }
  })
}


const ACTION_HANDLERS = {
  [NEWS_DATA_LOADING]:(state,action) => (Object.assign(state,{
    loading:action.loading
  })),
  [RECEIVE_DATA]:(state,action) => (Object.assign(state,{
    data:action.data,
    pagination:action.pagination
  }))
}

const initialState = {
  loading:false,
  data:[],
  pagination:handlePage()
}

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
