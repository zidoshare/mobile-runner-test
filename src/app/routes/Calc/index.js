import CalcContainer from './containers/calcContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/calc'
injectReducer({
  key:'calc',
  reducer,
})

export default CalcContainer