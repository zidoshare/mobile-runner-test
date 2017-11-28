import MyHistory from './MyHistory'
import { injectReducer } from '../../reducers'
import reducer from './module'
injectReducer({
  key: 'his',
  reducer,
})
export default MyHistory