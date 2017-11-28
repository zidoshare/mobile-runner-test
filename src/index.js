import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { get } from './app/Util'
import apiUrl from './app/apiUrl'
import { Toast } from 'antd-mobile'
import { replaceHref } from './app/reducers'
const Root = document.getElementById('root')



let render = () => {
  const App = require('./app/index').default
  ReactDOM.render(<AppContainer>
    <App />
  </AppContainer>, Root)
}
if (!(process.env.NODE_ENV === 'development')) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, Root)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./app/index', () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(Root)
      render()
    })
    )
  }
}

// Hot Module Replacement API
// if (module.hot) {
//   module
//     .hot
//     .accept('./', () => {
//       render(Routers)
//     })
// }

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var result = window.location.search.substr(1).match(reg)
  if (result != null) {
    return result[2]
  } else {
    return null
  }
}
let code = getQueryString('code')
let state = getQueryString('state')
if (code && state) {
  if (process.env.NODE_ENV === 'production' && window.location.pathname.indexOf('dawdawdaw') !== -1) {
    render()
  } else
    get(apiUrl.wechatLogin, {
      code,
      state,
    }).then(() => {
      replaceHref({
        pathname: window.location.pathname,
        search: window.location.search ? window.location.search.replace(/code=([^&]*)&state=([^&]*)(&|$)/i, '') : null,
      })
    }).then(() => {
      render()
    })
} else if (state || code) {
  Toast.fail('登录异常')
  window.location.href = '/'
} else {
  render()
}
