import CommodityContainer from './container/CommodityContainer'
import { injectReducer } from '../../reducers'
import reducer from './modules/commodity'
injectReducer({
  key: 'com',
  reducer
})

export default CommodityContainer