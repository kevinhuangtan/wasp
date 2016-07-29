//Set up firebase
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyD7uebkapR_L7MApC-zpdZAdwt8aMsiT8Q",
  authDomain: "alirt-ab979.firebaseapp.com",
  databaseURL: "https://alirt-ab979.firebaseio.com",
  storageBucket: "alirt-ab979.appspot.com",
};
var realfirebase = firebase.initializeApp(config);
module.exports.firebase = realfirebase;
