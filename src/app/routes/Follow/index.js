import Follow from './Follow'
import {injectReducer} from '../../reducers'
import reducer from './modules'
injectReducer({
  key:'follow',
  reducer,
})

export default Follow