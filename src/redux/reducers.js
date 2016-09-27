import { combineReducers } from 'redux'
import {
  INCREMENT_AMOUNT,
  DECREMENT_AMOUNT,
  TOGGLE_CATEGORY,
  TOGGLE_STORE,
  Categories
} from './actions';

import firebase from 'firebase';

function amount(state = 0, action){
  switch (action.type) {
    case INCREMENT_AMOUNT:
      return state + 1
    default:
      return state
  }
}

function categorySelected(state = "all", action){
  switch (action.type) {
    case TOGGLE_CATEGORY:
      return action.category
    default:
      return state
  }
}

function storesSelected(state = [], action){
  switch (action.type) {
    case TOGGLE_STORE:
      var ret = Object.assign([], state); // do not mutate original state
      var index = state.indexOf(action.store);
      if(index == -1){
        ret.push(action.store);
      }
      else{
        ret.splice(index, 1);
      }
      return ret
    default:
      return state
  }
}


function products(state = {}, action){
  switch (action.type) {
    case 'FETCH_PRODUCTS_SUCCESS':
      return action.products
    default:
      return state
  }
}

function activity(state = {}, action){
  switch (action.type) {
    case 'FETCH_ACTIVITY_SUCCESS':
      return action.activity
    default:
      return state
  }
}

function updateUserBag(savedProducts){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('updated bag for user ', user.uid);
      firebase.database().ref(`users/${user.uid}/bag`).update(savedProducts);
    }
  });
}

function savedProducts(state = [], action){
  switch (action.type) {
    case 'TOGGLE_SAVED_PRODUCT':
      var ret = Object.assign([], state);
      var productKey = action.product.key;
      var index = ret.indexOf(productKey);
      if(index == -1){
        ret.push(productKey);
      }
      else{
        ret.splice(index, 1);
      }
      updateUserBag(ret)
      return ret
    case 'SET_BAG':
      return action.bag
    default:
      return state
  }
}


function prices(state = {priceFloor : 0, priceCeiling : 1000}, action){
  switch (action.type) {
    case 'CHANGE_PRICE_CEILING':
      return Object.assign({}, state, {
        priceCeiling: parseInt(action.price) || 0
      })
    case 'CHANGE_PRICE_FLOOR':
      return Object.assign({}, state, {
        priceFloor: parseInt(action.price) || 0
      })
    default:
      return state
  }
}

function view(state = "feed", action){
  switch (action.type) {
    case 'TOGGLE_VIEW':
      var ret = (state == "feed") ? "bag" : "feed";
      return ret
    default:
      return state
  }
}

const todoApp = combineReducers({
  amount,
  categorySelected,
  storesSelected,
  products,
  savedProducts,
  prices,
  view
})

export default todoApp
