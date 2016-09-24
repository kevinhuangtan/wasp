import React, { PropTypes, Component } from 'react';

const styles = {
  priceInput:{
    width: 50,
    margin: 20,
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'right',
    paddingRight: 5
  }
}

const Prices = ({prices, handleChangePriceFloor, handleChangePriceCeiling }) => {
  return (
    <div>
      <span>price range: </span>
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

export default Prices
