const LOAD_MESSAGES = 'LOAD_MESSAGES'
const LOAD_COUNT_MESSAGE = 'LOAD_COUNT_MESSAGE'
const LOAD_MESSAGE = 'LOAD_MESSAGE'
import { get } from '../Util'
import apiUrl from '../apiUrl'
export const loadUnReadCount = () => dispatch => {
  dispatch({
    type: LOAD_COUNT_MESSAGE,
    unReadCount: 0,
  })
  return get(apiUrl.unReadUrl).then(unReadCount => {
    dispatch({
      type: LOAD_COUNT_MESSAGE,
      unReadCount,
    })
  })
}
export const loadMessages = (currentPage) => dispatch => {
  dispatch({
    type: LOAD_MESSAGES,
    loading: true,
  })
  return get(apiUrl.messagesUrl, {
    currentPage,
  }).then(data => {
    const action = {
      type: LOAD_MESSAGES,
      messages: data.records,
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

export const loadMessage = (id) => dispatch => {
  dispatch({
    type: LOAD_MESSAGE,
    messageLoading: true,
  })
  return get(apiUrl.messageUrl, {
    id
  }).then(message => {
    dispatch({
      type: LOAD_MESSAGE,
      messageLoading: false,
      message,
    })
  })
}

const ACTION_HANDLERS = {
  [LOAD_MESSAGE]: (state, action) => ({ ...state, ...action }),
  [LOAD_COUNT_MESSAGE]: (state, action) => ({ ...state, ...action }),
  [LOAD_MESSAGES]: (state, action) => {
    if (action.loading) {
      return {
        ...state,
        ...action,
      }
    }
    if (!state.page || action.page.current > state.page.current) {
      let result = state.messages || []
      result = result.concat(action.messages)
      return {
        ...state,
        ...action,
        messages: result,
        hasMore: (action.page.current < action.page.pages - 1),
        loading: action.loading
      }
    } else if (action.page.current <= state.page.current) {
      let messages = action.messages
      let page = action.page
      let initialed = true
      let hasMore = (action.page.current < action.page.pages - 1)
      let loading = action.loading
      return {
        ...state,
        messages,
        page,
        initialed,
        hasMore,
        loading,
      }
    }
    return state
  }
}

const initialState = {
  messages: [],
  loading: false,
  unReadCount: 0,
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}