import { connect } from 'react-redux'
import { changePriceFloor, changePriceCeiling } from '../../redux/actions'
import Prices from '../../components/Prices'

// subscribe to store's state
const mapStateToProps = (state) => {
  return {
    prices: state.prices
  }
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    handleChangePriceFloor: (price) => {
      dispatch(changePriceFloor(price))
    },
    handleChangePriceCeiling: (price) => {
      dispatch(changePriceCeiling(price))
    }
  }
}

const PricesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices)

export default PricesContainer
