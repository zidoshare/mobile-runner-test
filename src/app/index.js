import React from 'react'
import { PropTypes } from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store from './reducers'
import { history } from './reducers'

import Home from './routes/Home'
import './style/core.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Home}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
}