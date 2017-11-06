import {connect} from 'react-redux'
import CoreLayout from '../components/CoreLayout'
import {changeMenu,collapse} from '../modules/core'
import {push} from 'react-router-redux/actions'
const mapStateToProps = (state) => ({
  core:state.core,
  location:state.router.location,
})

const mapDispatchToProps = {
  changeMenu,
  collapse,
  push,
}

export default connect(mapStateToProps,mapDispatchToProps)(CoreLayout)
