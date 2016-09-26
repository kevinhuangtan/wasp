import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

const Container = ({ }) => {
  return (
    <FacebookLogin
      appId="180398319064354"
      autoLoad={true}
      fields="name,email,picture,public_profile,user_friends"
      callback={responseFacebook}
      cssClass="fb-login-button"
      icon="fa-facebook"
    />
  )
}
export default Container
