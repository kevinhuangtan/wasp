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
            <div key={i} style={{
                margin: 5,
                width: mobile ? "45%" : 200
              }}>

              <Product supersmall product={allProductsObj[productKey]} />
            </div>
          )
        }
      })
    }
    else{
      ProductList = ( <p>Your bag is empty.</p>)
    }
    return (
      <section  style={{paddingBottom : 100}}>
        <hr/>
        <h4 style={{
            opacity: .7,
            fontWeight:'bold',
            textAlign: 'center'
          }}>YOUR BAG</h4>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {ProductList}
        </div>
      </section>
    )

  }
}
