export const ADD = 'ADD'

export const add = (value) => ({
  type:ADD,
  value,
})

export const ACTION_HANDLERS = {
  [ADD]:(state,action) => ({
    ...state,
    result:state.result+action.value,
  })
}
const initialState = {
  result:0,
}
export default (state = initialState,action) => {
  const handler = ACTION_HANDLERS[action.type]
  
  return handler ? handler(state, action) : state
}