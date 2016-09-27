import React, { PropTypes, Component } from 'react';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import Product from '../../containers/Product';

const Saved = ({ allProductsObj, savedProducts, view }) => {
  var showView = view == "bag";
  var ProductList;
  if(savedProducts.length != 0){
    ProductList = savedProducts.map((productKey, i) => {
      return (
        <Product product={allProductsObj[productKey]} key={i}/>
      )
    })
  }
  else{
    ProductList = ( <h3>Your bag is empty!</h3>)
  }

  return (
      <div
        style={{
          display: showView ? 'flex' : 'none',
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: mobile ? 100 : 0
        }}>
        {ProductList}
      </div>
  )
}

export default Saved
