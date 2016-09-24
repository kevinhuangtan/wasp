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

import Feed from './containers/Feed';
import Firebase from './containers/Firebase';
import Styles from './styles';
const black = Styles.black;

/// initialize redux
import { createStore } from 'redux'
import todoApp from './redux/reducers'
import { Provider } from 'react-redux'
let store = createStore(todoApp)

////////////////////////////////////////////////
///////////////*~ React Component ~*////////////
////////////////////////////////////////////////


class YourReactApp extends Component {
  render(){
    return (
      <Provider store={store}>
        <section>
          <div
            className="shadow"
            style={{
              position: 'fixed',
              top:0,
              zIndex:1000,
              padding: 15,
              backgroundColor: 'rgb(254,254,254)', paddingLeft: 40,
              width: '100%',
              borderStyle:'solid', borderColor:black, borderWidth: 0, borderBottomWidth: 3,
              display: 'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              alignItems:'center'
            }}>
            <h4 style={{margin:0}}><b style={{color:black}}>Wa</b>lt <b style={{color:black}}>S</b>teve <b style={{color:black}}>P</b>icasso</h4>
            <p style={{margin:0, fontSize: 12}}>WaSP is a free platform that aggregates the latest menswear products from a bunch of sources</p>
          </div>
          <Feed/>
          <Firebase/>
        </section>
      </Provider>
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
