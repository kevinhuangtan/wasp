import React, { PropTypes, Component } from 'react';
import FacebookLogin from 'react-facebook-login';

// const responseFacebook = (response) => {
//   console.log(response);
//   var provider = new firebase.auth.FacebookAuthProvider();
// }

class LoginButton extends Component {
  state = {
    signedIn : false,
    userName : ''
  }
  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user', user.email);
        self.setState({
          signedIn : true,
          userName : user.email
         })
        // User is signed in.
      } else {
        // No user is signed in.
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
      console.log('logged in: ', user.email, user.displayName, user.uid,)
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
  signout = () => {

  }
  render(){
    const { signedIn, userName } = this.state;
    if(signedIn){
      return <span>{userName}</span>
    }
    return(
      <button
        className="btn btn-block btn-social btn-facebook"
        onClick={this.login}><span className="fa fa-facebook"></span> Sign in with Facebook</button>
    )
  }
}

const Container = ({ }) => {
  return (
    <LoginButton/>
  )
}
export default Container
