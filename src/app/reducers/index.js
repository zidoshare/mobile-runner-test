import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware, routerReducer, push, go } from 'react-router-redux'

export const history = createHistory()

const historyMiddleware = routerMiddleware(history)
const middleware = [thunk, historyMiddleware]
const enhancers = []
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router: routerReducer,
    ...asyncReducers
  })
}
const store = createStore(
  makeRootReducer(),
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
)
store.asyncReducers = {}
export const injectReducer = ({ key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

let return_path = 0
export const transBeginTo = (url) => {
  store.dispatch(push(url))
  return_path = -1
}

history.listen((location, action) => {
  if (return_path != 0) {
    if (action === 'POP') {
      return_path++
    } else if (action === 'PUSH') {
      return_path--
    }
  }
})
export const transAfter = () => {
  store.dispatch(go(return_path))
  return_path = 0
}
export const transBegining = () => {
  return return_path !== 0
}
export default store