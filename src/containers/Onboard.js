import { connect } from 'react-redux'
import { toggleCategory, setView } from '../redux/actions'
import Onboard from '../components/Onboard'

const mapStateToProps = (state) => {
  return {
    savedProducts: state.savedProducts || [],
    storesSelected: state.storesSelected,
    tagsSelected: state.tags.tagsSelected,
    numProducts: Object.keys(state.products).length
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view) => {
      dispatch(setView(view))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboard)

export default Container
