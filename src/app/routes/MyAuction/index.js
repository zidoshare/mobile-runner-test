import MyAuction from './MyAuction'
import { injectReducer } from '../../reducers'
import reducer from './module'
injectReducer({
  key: 'mau',
  reducer,
})
export default MyAuction