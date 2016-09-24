import { connect } from 'react-redux'
import { toggleSave } from '../../redux/actions'
import Feed from '../../components/Feed'

const filterByStore = (product, storesSelected) => {
  if(storesSelected.indexOf(product.store) == -1){
    return false
  }
  return true

}

const filterByPrice = (product, state) => {
  if(product.price > state.prices.priceFloor && product.price < state.prices.priceCeiling){
    return true
  }
  return false
}

const filterByCategory = (product, categorySelected) => {
  if(categorySelected == 'all'){
    return true
  }
  if(product.category.indexOf(categorySelected) == -1){
    return false
  }
  return true
}

const filterProducts = (state) => {
  var ret = [];
  var productKeys = Object.keys(state.products);
  productKeys.forEach((productKey, i) => {
    var product = state.products[productKey];
    if(product.price && product.name && product.image && product.category){
      if(!filterByCategory(product, state.categorySelected)){
        return
      }
      if(!filterByStore(product, state.storesSelected)){
        return
      }
      if(!filterByPrice(product, state)){
        return
      }
      ret.push(product);
    }
  })

  return ret.sort((a,b)=>{
    return a.price - b.price
  })
}

// subscribe to store's state
const mapStateToProps = (state) => {

  var filteredProductsArr = filterProducts(state);
  return {
    storesSelected: state.categorySelected,
    categorySelected: state.categorySelected,
    allProductsObj: state.products,
    savedProducts: state.savedProducts,
    filteredProductsArr: filteredProductsArr, // filter products
  }
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    onClickSave: (product) => {
      dispatch(toggleSave(product))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)

export default Container
