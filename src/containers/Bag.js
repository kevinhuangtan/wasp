import { connect } from 'react-redux'
import { toggleView, setBagFromSession } from '../redux/actions'
import Bag from '../components/Bag'

const mapStateToProps = (state) => {
  return {
    savedProducts: state.savedProducts || [],
    view: state.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(toggleView())
    },
    setBag: (bag) => {
      dispatch(setBagFromSession(bag))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bag)

export default Container
