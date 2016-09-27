import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

export default class Bag extends Component {
  componentDidMount(){
    var self = this;
    // retrieve user's bag from previous session
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var refProducts = firebase.database().ref(`users/${user.uid}/bag`);
        refProducts.once('value', (snap) => {
          self.props.setBag(snap.val());
        });
      }
    });
  }
  render(){
    const {savedProducts, view, handleClick} = this.props;
    var isSaved = savedProducts.length > 0;
    var text = "back to search";
    if(view == "feed"){
      text = `Bag (${savedProducts.length})`
    }
    return(
      <button
        onClick={handleClick}
        style={{
            position: 'fixed',
            bottom: 25,
            right: 25,
            borderRadius : 5,
            backgroundColor: isSaved ? Styles.colorMain : Styles.colorSecondary,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            zIndex: 100,
            borderWidth: 0,
            opacity: isSaved ? 1 : .5,
            color: isSaved ? 'white' : Styles.colorText
          }}>
          {text}
      </button>
    )
  }
}
