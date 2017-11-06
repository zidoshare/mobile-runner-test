import createHistory from 'history/createBrowserHistory'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {routerMiddleware, routerReducer} from 'react-router-redux'

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
export const injectReducer = ({key, reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default store