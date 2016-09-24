import { connect } from 'react-redux'
import { toggleSave, STORE_MAP } from '../../redux/actions'
import Product from '../../components/Product'

const mapStateToProps = (state) => {
  return {
    savedProducts: state.savedProducts,
    storeMap: STORE_MAP
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSave: (category) => {
      console.log('dispatch: ', category)
      dispatch(toggleSave(category))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)

export default Container
