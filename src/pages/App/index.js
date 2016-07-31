////////////////////////////////////////////////
//////////////*~ Dependencies ~*////////////////
////////////////////////////////////////////////

import React, { PropTypes, Component } from 'react';

// create new project at https://console.firebase.google.com/
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAU7WwWDLCClqH7-XkttUUKg2jsHqOl4Y4",
  authDomain: "simple-react-firebase-app.firebaseapp.com",
  databaseURL: "https://simple-react-firebase-app.firebaseio.com",
  storageBucket: "simple-react-firebase-app.appspot.com",
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

  componentDidMount(){
  }

  render(){
    return (
      <Home/>
    )
  }
}



module.exports = App;
