import { connect } from 'react-redux'
import { toggleStore, STORE_KEYS, STORE_MAP } from '../../redux/actions'
import Stores from '../../components/Stores'

function calculateStoreTotals(state){
  const products = state.products;
  const categorySelected = state.categorySelected;

  var storeTotals = {};
  STORE_KEYS.forEach((storeKey)=>{
    storeTotals[storeKey] = 0;
  })
  var productKeys = Object.keys(products);
  productKeys.forEach((productKey, i) =>{
    var product = products[productKey];
    var storeKey = product.store;

    if(categorySelected != "all"){
      if(!product.category || product.category.indexOf(categorySelected) == -1){
        return
      }
    }
    if(storeKey in storeTotals){
      storeTotals[storeKey] += 1;
    }
    else{
      storeTotals[storeKey] = 1;
    }
  })
  return storeTotals
}


// subscribe to store's state
const mapStateToProps = (state) => {
  return {
    storesSelected: state.storesSelected,
    storeTotals: calculateStoreTotals(state),
    storeKeys: STORE_KEYS,
    storeMap: STORE_MAP
  }
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    onStoreClick: (store) => {
      dispatch(toggleStore(store))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stores)

export default Container
