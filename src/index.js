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

import Styles from './styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

/// initialize redux
import { createStore } from 'redux'
import todoApp from './redux/reducers'
import { Provider } from 'react-redux'
let store = createStore(todoApp)

const styles = {
  banner:{
    position: mobile ? 'absolute' : 'fixed',
    top:0,
    zIndex: 1000,
    padding: 15,
    backgroundColor: 'rgb(254,254,254)', paddingLeft: 40,
    width: '100%',
    borderStyle:'solid', borderColor: Styles.black, borderWidth: 0, borderBottomWidth: 3,
    display: mobile ? 'block' : 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  container:{
    padding: mobile ? 0 : 40,
    marginTop: mobile ? 80 : 30,
    paddingRight: mobile ? 0 : 50,
    paddingBottom: mobile ? 150 : 0
  }
}

////////////////////////////////////////////////
///////////////*~ React Component ~*////////////
////////////////////////////////////////////////

const Banner = () => {
  return(
    <div
      className="shadow"
      style={styles.banner}>
      <h4
         onClick={()=>{
            window.open('https://www.youtube.com/watch?v=irCZAR5xQ5A&feature=youtu.be&t=2s', '_blank');
         }}
         style={{
           cursor:'pointer',
           margin:0
         }}>
        <b style={{color: Styles.black}}>Wa</b>lt <b style={{color: Styles.black}}>S</b>teve <b style={{color: Styles.black}}>P</b>icasso</h4>
      <p style={{
          margin:0,
          fontSize: Styles.small,
          display: mobile ? 'none' : 'block'
        }}>WaSP is a free platform for finding the latest menswear</p>
    </div>
  )
}

import View from './containers/View';
import Firebase from './containers/Firebase';
import Login from './containers/Login';
import Bag from './containers/Bag';
import Activity from './containers/Activity';


class YourReactApp extends Component {
  render(){
    return (
      <Provider store={store}>
        <section>
          <Banner/>
          <div style={styles.container}>
            <View/>
          </div>
          <Login/>
          <Firebase/>
          <Bag/>

          <Activity/>
        </section>
      </Provider>
    )
  }
}

ReactDOM.render(
  <YourReactApp />,
  document.getElementById('root')
);
