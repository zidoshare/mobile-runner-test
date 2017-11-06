import CoreLayout from './containers/CoreLayoutContainer'
import {Menus,SubMenu,MenuItem,Routes} from './components/CoreLayout'
import {injectReducer} from '../../reducers'
import reducer from './modules/core'

injectReducer({
  key: 'core',
  reducer,
})

export default CoreLayout

export {
  Menus,
  SubMenu,
  MenuItem,
  Routes,
}