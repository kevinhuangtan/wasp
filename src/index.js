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
  apiKey: "AIzaSyAU7WwWDLCClqH7-XkttUUKg2jsHqOl4Y4",
  authDomain: "simple-react-firebase-app.firebaseapp.com",
  databaseURL: "https://simple-react-firebase-app.firebaseio.com",
  storageBucket: "simple-react-firebase-app.appspot.com",
};
firebase.initializeApp(config);

////////////////////////////////////////////////
//////////////////*~ Modules ~*/////////////////
////////////////////////////////////////////////

// These are modules defined by you

import Page1 from './pages/Page1'; // you can 'Page1' to whatever makes sense
import Page2 from './pages/Page2';
import Navbar from './parts/Navbar';


////////////////////////////////////////////////
///////////////*~ React Component ~*////////////
////////////////////////////////////////////////

// routing. only need this for root component
function getCurrentPage(){
  var CurrentPage;
  switch (window.location.pathname){
    case "/":
      CurrentPage = <Page1/>
    break;
    case "/page1":
      CurrentPage = <Page1/>
      break;
    case "/page2":
      CurrentPage = <Page2/>
      break;
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
        <Navbar/>
        <section>
          {Page}
        </section>
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
