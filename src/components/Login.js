import React, { PropTypes, Component } from 'react';
import Styles from '../styles';

import FBLogin from '../components/FBLogin';
import GoogleLogin from '../components/GoogleLogin';

export default class LoginButton extends Component {
  state = {
    signedIn : false,
    user : ""
  }

  static propTypes = {
    savedProducts: PropTypes.array.isRequired,
    storesSelected: PropTypes.array.isRequired,
  }

  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
          signedIn : true,
          user: user
        })
        var refVisits = firebase.database().ref(`users/${user.uid}/visits`);
        refVisits.once('value', (snap) => {
          if(snap.val()){
            refVisits.set(snap.val() + 1)
          }
          else{
            refVisits.set(1)

          }
        })
      }
    });
  }
  render(){
    const { savedProducts, storesSelected, view, login } = this.props;
    const { signedIn, user } = this.state;
    if(user){
      return null
    }
    if(!login){
      return null

    }

    return(
      <div style={{
          backgroundColor:'white',
          border: '1px solid black',
          position:'fixed',
          top:85,
          right: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems:'flex-start',
          width: 250,
          padding:10,
          ...Styles.boxShadow
        }}>
        <p style={{fontSize:Styles.small}}>If you want to save products for later, login here. It takes just a second!</p>
        <FBLogin/>
        <GoogleLogin/>
      </div>
    )
  }
}
