import React, { PropTypes, Component } from 'react';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const colorMain = Styles.colorMain;
const colorSecondary = Styles.colorSecondary;
const colorText = Styles.colorText;

export default class Bag extends Component {
  render(){
    const { savedProducts, toggleSavedProductsView, savedProductsView } = this.props;
    var isSaved = savedProducts.length > 0;
    var text = savedProductsView
    ? "back to search"
    : `Bag (${savedProducts.length})`;

    return(
      <button
        onClick={toggleSavedProductsView}
        style={{
              position: 'fixed',
              bottom: 25,
              right: 25,
              borderRadius : 5,
              backgroundColor: isSaved ? colorMain : colorSecondary,
              padding: 10,
              paddingLeft: 15,
              paddingRight: 15,
              zIndex: 100,
              borderWidth: 0,
              opacity: isSaved ? 1 : .5,
              color: isSaved ? 'white' : colorText
          }}>
          {text}
      </button>
    )
  }
}
