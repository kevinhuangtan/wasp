import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

export default class Bag extends Component {
  state = {
    firstName : ""
  }
  componentDidMount(){
    var self = this;
    // retrieve user's bag from previous session
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var refProducts = firebase.database().ref(`users/${user.uid}/bag`);
        refProducts.once('value', (snap) => {
          self.props.setBag(snap.val() || []);
        });
        var refName = firebase.database().ref(`users/${user.uid}/name`);
        refName.once('value', (snap) => {
          if(snap.val()){
            var nameWords = snap.val().split(/[ ,]+/);
            self.setState({ firstName : nameWords[0]})
          }
        })
      }
    });
  }
  render(){
    const {savedProducts, view, handleClick} = this.props;
    const { firstName } = this.state;
    var isSaved = savedProducts.length > 0;
    var text;
    if(view == "feed"){
      text = `Bag (${savedProducts.length})`
      if(firstName){
        text = `${firstName}'s ${text}`;
      }
    }
    else{
      text = "back to search"
    }
    return(
      <button
        className="hover-opacity-light"
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
