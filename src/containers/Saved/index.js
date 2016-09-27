import { connect } from 'react-redux'
import { toggleSave } from '../../redux/actions'
import Saved from '../../components/Saved'

// subscribe to store's state
const mapStateToProps = (state) => {
  return {
    allProductsObj: state.products,
    savedProducts: state.savedProducts,
    view: state.view
  }
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Saved)

export default Container
