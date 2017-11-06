import HomeContainer from './containers/HomeContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/home'
injectReducer({
  key:'home',
  reducer,
})

export default HomeContainer