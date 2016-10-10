import { connect } from 'react-redux'
import { toggleSave, setView } from '../redux/actions'
import Match from '../components/Match'


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
  if(product.category.indexOf(categorySelected) == -1){
    return false
  }
  return true
}

const filterByTag = (product, tagsSelected) => {
  var ret = true;
  tagsSelected.map((tag) =>{
    if(product.tags && product.tags.indexOf(tag) == -1){
      ret = false
    }
  })
  return ret
}

const filterProducts = (state) => {
  var ret = [];
  var productKeys = Object.keys(state.products);
  productKeys.forEach((productKey, i) => {
    var product = state.products[productKey];
    if(product.price && product.name && product.image && product.tags){
      if(!filterByStore(product, state.storesSelected)){
        return
      }
      if(!filterByPrice(product, state)){
        return
      }
      if(!filterByTag(product, state.tags.tagsSelected)){
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
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Match)

export default Container
