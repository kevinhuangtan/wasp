// Root Module

////////////////////////////////////////////////
//////////////*~ Dependencies ~*////////////////
////////////////////////////////////////////////

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

// Firebase Configuration
// To create a new project, go to https://console.firebase.google.com/

import firebase from 'firebase';
var config = {
 apiKey: "AIzaSyDBJh_zPIUxtAKJzHXfG3SVRVvPzIC0heE",
 authDomain: "walt-steve-picasso.firebaseapp.com",
 databaseURL: "https://walt-steve-picasso.firebaseio.com",
 storageBucket: "walt-steve-picasso.appspot.com",
 messagingSenderId: "473516392362"
};
firebase.initializeApp(config);

////////////////////////////////////////////////
//////////////////*~ Modules ~*/////////////////
////////////////////////////////////////////////

// These are modules defined by you

import Page1 from './pages/Page1'; // you can 'Page1' to whatever makes sense


////////////////////////////////////////////////
///////////////*~ React Component ~*////////////
////////////////////////////////////////////////

// Routing
function getCurrentPage(){
  var CurrentPage;
  switch (window.location.pathname){
    case "/":
      CurrentPage = <Page1/>
      break
    default:
      CurrentPage = <Page1/>;
      break
  }
  return CurrentPage
}


// Each module (i.e, /Page1/index.js) exports a React component
// this is a React component
class YourReactApp extends Component {

  // every React component has a render()
  render(){

    var Page = getCurrentPage();
    return (
      <section>
        {Page}
      </section>
    )
  }
}


// Top of the Tree
// React attaches all your React stuff - which is stored in a Virtual DOM  -
// to #root in your HTML

ReactDOM.render(
  <YourReactApp />,
  document.getElementById('root')
);
