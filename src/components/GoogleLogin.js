import React, { PropTypes, Component } from 'react';
import Styles from '../styles';

export default class LoginButton extends Component {
  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      var user = result.user;
      console.log('logged in: ', user.email, user.displayName, user.uid,);
      console.log(user)
      firebase.database().ref(`users/${user.uid}`).update({
        name: user.displayName,
        email: user.email,
        token: token
      });
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
      // ...
    });

  }
  render(){

    return(
        <button
          className="btn btn-block btn-social btn-google"
          onClick={this.login}><span className="fa fa-google"></span> Login with Google</button>
    )
  }
}
