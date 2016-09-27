import React, { PropTypes, Component } from 'react';
import Styles from '../../styles';

export default class LoginButton extends Component {
  state = {
    signedIn : false,
    userName : '',
    user : ""
  }
  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user', user.email);
        self.setState({
          signedIn : true,
          userName : user.email,
          user: user
        })
      }
    });
  }
  login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile,email,user_friends');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      var user = result.user;
      console.log('logged in: ', user.email, user.displayName, user.uid,);
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
    const { savedProducts, storesSelected } = this.props;
    const { signedIn, userName, user } = this.state;
    if(user){
      return null
    }
    if(storesSelected.length == 0){
      return null
    }

    return(
      <div style={{
          backgroundColor:'white',
          border: '1px solid black',
          position:'fixed',
          bottom:85,
          right: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems:'flex-start',
          width: 250,
          padding:10,
          ...Styles.boxShadow
        }}>
        <p>If you want to save products for later, login with facebook. It takes just a second!</p>
        <button
          className="btn btn-block btn-social btn-facebook"
          onClick={this.login}><span className="fa fa-facebook"></span> Login with Facebook</button>
      </div>
    )
  }
}
