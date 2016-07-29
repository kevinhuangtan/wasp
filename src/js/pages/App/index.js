////////////////////////////////////////////////
//////////////*~ Dependencies ~*////////////////
////////////////////////////////////////////////

import React, { PropTypes, Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

//Set up firebase
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyD7uebkapR_L7MApC-zpdZAdwt8aMsiT8Q",
  authDomain: "alirt-ab979.firebaseapp.com",
  databaseURL: "https://alirt-ab979.firebaseio.com",
  storageBucket: "alirt-ab979.appspot.com",
};
firebase.initializeApp(config);


////////////////////////////////////////////////
/////////////*~ Other Components ~*/////////////
////////////////////////////////////////////////

import Home from '../Home';

////////////////////////////////////////////////
////////////////*~ Component ~*/////////////////
////////////////////////////////////////////////

class App extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <Home/>
    )
  }
}



module.exports = App;
