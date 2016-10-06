/*
 * action types
 */

export const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT'
export const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
export const TOGGLE_STORE = 'TOGGLE_STORE'

export const STORE_KEYS =
[
  'asos',
  'topman',
  'zara',
  'uo',
  'uniqlo',
  'hm',
  'jcrew',
  // 'forever21'
];
export const STORE_MAP = {
  'asos': 'asos',
  'topman': 'topman',
  'uo': 'urban outfitters',
  'uniqlo': 'uniqlo',
  'hm': 'h&m',
  'zara' : "zara",
  'jcrew': 'j. crew',
  'forever21': 'forever 21'
}

////////////////////////////////////////////////
//////////////*~ Price Filter ~*////////////////
////////////////////////////////////////////////

export function changePriceCeiling(price) {
 return { type: 'CHANGE_PRICE_CEILING', price }
}
export function changePriceFloor(price) {
 return { type: 'CHANGE_PRICE_FLOOR', price }
}

export function incrementAmount(){
  return {type: INCREMENT_AMOUNT}
}

////////////////////////////////////////////////
//////////////*~ Category Filter ~*/////////////
////////////////////////////////////////////////

export function toggleCategory(category) {
  return { type: TOGGLE_CATEGORY, category }
}

////////////////////////////////////////////////
////////////////*~ Store Filter ~*//////////////
////////////////////////////////////////////////

export function toggleStore(store) {
  return { type: TOGGLE_STORE, store }
}

export function selectAllStores(){
  return { type: 'TOGGLE_ALL_STORES' }
}

////////////////////////////////////////////////
////////*~ Fetch Products from Firebase~*///////
////////////////////////////////////////////////

export function requestProducts() {
  return { type: 'FETCH_PRODUCTS_REQUEST' }
}

export function receiveProducts(products) {
  return { type: 'FETCH_PRODUCTS_SUCCESS', products }
}

export function deleteProduct(product){
  return { type: 'DELETE_PRODUCT', product}
}

////////////////////////////////////////////////
/////////////////////*~ Bag ~*//////////////////
////////////////////////////////////////////////

export function toggleSave(product) {
  return { type: 'TOGGLE_SAVED_PRODUCT', product }
}

export function setBagFromSession(bag) {
  return { type: 'SET_BAG', bag }
}

////////////////////////////////////////////////
////////////////////*~ Tags ~*//////////////////
////////////////////////////////////////////////


export function setTags(tags) {
  return { type: 'SET_TAGS', tags }
}

export function setTagsSelected(tagsSelected) {
  return { type: 'SET_TAGS_SELECTED', tagsSelected }
}


////////////////////////////////////////////////
///////////////////*~ Other ~*//////////////////
////////////////////////////////////////////////

export function toggleView() {
  return { type: 'TOGGLE_VIEW' }
}

export function setView(view){
  return { type: 'SET_VIEW', view }

}

export function requestActivity() {
  return { type: 'FETCH_ACTIVITY_REQUEST' }
}

export function receiveActivity(products) {
  return { type: 'FETCH_ACTIVITY_SUCCESS', products }
}
