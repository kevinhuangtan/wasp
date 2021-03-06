import { connect } from 'react-redux'
import { toggleSave } from '../redux/actions'
import Outfits from '../components/Outfits'

// subscribe to store's state
const mapStateToProps = (state) => {
  return {
    allProductsObj: state.products,
    view: state.view,
    storesSelected: state.storesSelected,
    tagsSelected: state.tags.tagsSelected || []
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
)(Outfits)

export default Container
