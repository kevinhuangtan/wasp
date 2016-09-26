import React, { PropTypes, Component } from 'react';
import FacebookLogin from 'react-facebook-login';

// const responseFacebook = (response) => {
//   console.log(response);
//   var provider = new firebase.auth.FacebookAuthProvider();
// }

class LoginButton extends Component {
  login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('name,image,public_profile,email,user_friends');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
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
        <button onClick={this.login}>Facebook Login</button>
      )
  }
}
// <FacebookLogin
//   appId="180398319064354"
//   autoLoad={true}
//   scope="name,email,picture,public_profile,user_friends"
//   callback={responseFacebook}
//   cssClass="fb-login-button"
//   icon="fa-facebook"
// />

const Container = ({ }) => {
  return (
    <LoginButton/>
  )
}
export default Container
