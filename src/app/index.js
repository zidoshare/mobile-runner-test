import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store from './reducers'
import { history } from './reducers'
import Home from './routes/Home'
import Commodities from './routes/Commodities'
import Commodity from './routes/Commodity'
import Send from './routes/Send'
import Person from './routes/Person'
import PersonInfo from './routes/PersonInfo'
import Auction from './routes/Auctions'
import './style/core.scss'
import MyAddress from './routes/MyAddress'
import Follow from './routes/Follow'
import MyAuction from './routes/MyAuction'
import PayResult from './routes/PayResult'
import Order from './routes/Order'
import MyHistory from './routes/MyHistoiry'
import Messages from './routes/Messages'
import MessageInfo from './routes/MessageInfo'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/commodities" component={Commodities} />
            <Route path="/commodity/:id" component={Commodity} />
            <Route path="/send" component={Send} />
            <Route path="/person" component={Person} />
            <Route path="/personInfo" component={PersonInfo} />
            <Route path="/address" component={MyAddress} />
            <Route path="/auction" component={Auction} />
            <Route path="/follow" component={Follow} />
            <Route path="/myAuction" component={MyAuction} />
            <Route path="/payResult/:orderId" component={PayResult} />
            <Route path="/order/:id" component={Order} />
            <Route path="/history" component={MyHistory} />
            <Route path="/messages" exact component={Messages} />
            <Route path="/messages/info/:id" component={MessageInfo} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}