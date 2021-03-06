import React, { PropTypes, Component } from 'react';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const styles = {
  priceInput:{
    width: 50,
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'right',
    paddingRight: 5,
  }
}


export default class Prices extends Component {
  static propTypes = {
    prices: PropTypes.object.isRequired,
    handleChangePriceFloor: PropTypes.func.isRequired,
    handleChangePriceCeiling: PropTypes.func.isRequired,
  }

  render(){
    const {prices, handleChangePriceFloor, handleChangePriceCeiling } = this.props;
    return (
      <div style={{
          fontSize : 12,
          display: mobile ? 'none' : 'block'
        }}>
        <span>price range:</span>
        <input
          style={styles.priceInput}
          placeholder="low"
          value={prices.priceFloor}
          onChange={(e) => handleChangePriceFloor(e.target.value)}/>
        <span>to</span>
        <input
          style={styles.priceInput}
          placeholder="high"
          value={prices.priceCeiling}
          onChange={(e) => handleChangePriceCeiling(e.target.value)}/>
      </div>
    )
  }
}
