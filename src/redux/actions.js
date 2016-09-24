/*
 * action types
 */

export const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT'
export const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'
export const TOGGLE_STORE = 'TOGGLE_STORE'

export const STORE_KEYS = [ 'asos', 'topman', 'uo', 'uniqlo', 'hm', 'jcrew', 'forever21'];
export const STORE_MAP = {
  'asos': 'Asos',
  'topman': 'Topman',
  'uo': 'Urban Outfitters',
  'uniqlo': 'Uniqlo',
  'hm': 'H&M',
  'jcrew': 'J. Crew',
  'forever21': 'Forever 21'
}


export function changePriceCeiling(price) {
 return { type: 'CHANGE_PRICE_CEILING', price }
}
export function changePriceFloor(price) {
 return { type: 'CHANGE_PRICE_FLOOR', price }
}

export function incrementAmount(){
  return {type: INCREMENT_AMOUNT}
}

export function toggleCategory(category) {
  return { type: TOGGLE_CATEGORY, category }
}

export function toggleStore(store) {
  return { type: TOGGLE_STORE, store }
}

export function requestProducts() {
  return { type: 'FETCH_PRODUCTS_REQUEST' }
}

export function receiveProducts(products) {
  return { type: 'FETCH_PRODUCTS_SUCCESS', products }
}

export function toggleSave(product) {
  return { type: 'TOGGLE_SAVED_PRODUCT', product }
}
