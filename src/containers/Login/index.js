import { connect } from 'react-redux'
import { toggleCategory } from '../../redux/actions'
import Login from '../../components/Login'

const mapStateToProps = (state) => {
  return {
    savedProducts: state.savedProducts || [],
    storesSelected: state.storesSelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default Container
