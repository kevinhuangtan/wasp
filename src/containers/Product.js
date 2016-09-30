import { connect } from 'react-redux'
import { toggleSave, STORE_MAP, deleteProduct } from '../redux/actions'
import Product from '../components/Product'

const mapStateToProps = (state) => {
  return {
    savedProducts: state.savedProducts,
    storeMap: STORE_MAP
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickSave: (category) => {
      dispatch(toggleSave(category))
    },
    deleteProduct: (product) => {
      dispatch(deleteProduct(product))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)

export default Container
