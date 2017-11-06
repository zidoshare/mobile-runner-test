import News from './container/NewsContainer'
import {injectReducer} from '../../reducers'
import reducer from './modules/news'
injectReducer({
  key:'news',
  reducer,
})

export default News