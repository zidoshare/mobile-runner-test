import Commodities from './container/CommoditiesContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/commodities'
injectReducer({
  key:'coms',
  reducer,
})

export default Commodities