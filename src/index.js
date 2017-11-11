import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

const Root = document.getElementById('root')

// function getQueryString(name) {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
//   var result = window.location.search.substr(1).match(reg)
//   if (result != null) {
//     return result[2]
//   } else {
//     return null
//   }
// }
// let code = getQueryString('code')
// if (code) {
//   alert(code)
// } else {
//   window.location.href = encodeURI('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxba710e7a2fd8ba1c&redirect_uri=http://www.chenxiculture.cn&response_type=code&scope=snsapi_userinfo#wechat_redirect')
// }


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

render()
