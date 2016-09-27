import { connect } from 'react-redux'
import { toggleStore, STORE_KEYS, STORE_MAP } from '../../redux/actions'
import Welcome from '../../components/Welcome'


// subscribe to store's state
const mapStateToProps = (state) => {
  return {
    storesSelected: state.storesSelected,
  }
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    onStoreClick: () => {
      // do nothing
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome)

export default Container
