import {connect} from 'react-redux'
import News from '../components/News'
import {loadData} from '../modules/news'

const mapStateToProps = (state) =>({
  news:state.news,
})

const mapDispatchToProps = {
  loadData,
}

export default connect(mapStateToProps,mapDispatchToProps)(News)