import Career from './container/CareerContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/career'
injectReducer({
  key:'career',
  reducer,
})

export default Career