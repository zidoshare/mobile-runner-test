export const CHANGE_MENU = 'CHANGE_MENU'
export const COLLAPSED_MENU = 'COLLAPSED_MENU'
//menu改变动作创建方法
export const changeMenu = (pathname) => ({
  type: CHANGE_MENU,
  selectedKeys: [pathname],
})
//菜单打开收起动作创建方法
export const collapse = (collapsed) => ({
  type: COLLAPSED_MENU,
  collapsed,
})

const ACTION_HANDLERS = {
  [CHANGE_MENU]: (state, action) => ({
    selectedKeys: action.selectedKeys,
  }),
  [COLLAPSED_MENU]: (state, action) => ({
    collapsed: action.collapsed
  })
}

const initialState = {
  selectedKeys: [],
  collapsed: false,
}

export const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

export default reducer
