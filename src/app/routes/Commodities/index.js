import Commodities from './container/CommoditiesContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/commodities'
injectReducer({
  key:'com',
  reducer,
})

export default Commodities