import React, { PropTypes, Component } from 'react';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import Product from '../containers/Product';
import FBLogin from '../components/FBLogin';

export default class Saved extends Component {
  static propTypes = {
    allProductsObj: PropTypes.object.isRequired,
    savedProducts: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
  }

  render(){
    const { allProductsObj, savedProducts, view } = this.props;
    var ProductList;
    if(savedProducts.length != 0){
      ProductList = savedProducts.map((productKey, i) => {
        if(productKey in allProductsObj){
          return (
            <Product product={allProductsObj[productKey]} key={i}/>
          )          
        }
      })
    }
    else{
      ProductList = ( <p>Your bag is empty.</p>)
    }

    return (
      <section  style={{paddingBottom : 100}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: mobile ? 100 : 0
          }}>
          {ProductList}
        </div>
      </section>
    )

  }
}
