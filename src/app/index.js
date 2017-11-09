import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store from './reducers'
import { history } from './reducers'
import Home from './routes/Home'
import Commodities from './routes/Commodities'
import Commodity from './routes/Commodity'
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
            <Route path="/" exact component={Home}/>
            <Route path="/commodities" component={Commodities} />
            <Route path="/commodity/:id" component={Commodity} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}