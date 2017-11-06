import {connect} from 'react-redux'
import Career from '../components/Career'
import {loadData} from '../modules/career'

const mapStateToProps = (state) =>({
  career:state.career,
})

const mapDispatchToProps = {
  loadData,
}

export default connect(mapStateToProps,mapDispatchToProps)(Career)