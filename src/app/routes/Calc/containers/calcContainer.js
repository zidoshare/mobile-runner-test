import {connect} from 'react-redux'
import {add} from '../modules/calc'
import Calc from '../components/Calc'
const mapStateToProps = (state) => ({
  result:state.calc.result,
})

const mapDispatchToProps = {
  add,
}

export default connect(mapStateToProps,mapDispatchToProps)(Calc)