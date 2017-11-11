import Commodities from './container/CommoditiesContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/commodities'
injectReducer({
  key:'auction',
  reducer,
})

export default Commodities