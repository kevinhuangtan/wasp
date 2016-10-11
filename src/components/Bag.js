import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

export default class Bag extends Component {
  state = {
    firstName : ""
  }

  static propTypes = {
    savedProducts: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    setBag: PropTypes.func.isRequired
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
  generateText = () => {
    let text;
    if(this.state.firstName){
      text = <span>{this.state.firstName}'s <span style={{fontSize: 18}}>👜</span>  ({this.props.savedProducts.length})</span>;
    }
    else{
      text  = <span><span style={{fontSize: 18}}>👜</span> ({this.props.savedProducts.length})</span>;
    }
    return text
  }
  handleClick = () => {
    if(this.props.view == "BAG"){
      this.props.handleClick("SEARCH")
    }
    else{
      this.props.handleClick("BAG")
    }
  }
  render(){
    const {savedProducts, view, handleClick} = this.props;
    const { firstName } = this.state;
    var isSaved = savedProducts.length > 0;

    var text;
    switch(view){
      case "SEARCH":
        text = this.generateText()
        break
      case "MATCH":
        text = this.generateText()
        break
      case "BAG":
        text = <span>back to search</span>
        break
      default:
        return null
        break
    }
    return(
      <button
        onClick={this.handleClick}
        style={{
            position: 'fixed',
            top: mobile ? 'auto' : 25,
            right: 25,
            bottom: mobile ? 25 : ' auto',
            backgroundColor: isSaved ? Styles.colorTertiary : Styles.colorSecondary,
            zIndex: 100,
            width: 'auto',
            color: isSaved ? 'white' : Styles.colorText
          }}>
          {text}
      </button>
    )
  }
}
