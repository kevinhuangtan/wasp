import { connect } from 'react-redux'
import { toggleSave, setView, showLogin } from '../redux/actions'
import Match from '../components/Match'


// subscribe to store's state
const mapStateToProps = (state) => {

  return {
    allProductsObj: state.products || {},
    view: state.view,
    storesSelected: state.storesSelected,
    tagsSelected: state.tags.tagsSelected || [],
  }
}


// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view) => {
      dispatch(setView(view))
    },
    showLogin: () => {
      dispatch(showLogin())

    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Match)

export default Container
