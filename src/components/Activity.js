import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

export default class Bag extends Component {
  state = {
    activity : [],
    users: {}
  }

  static propTypes = {
  }

  componentDidMount(){
    var self = this;
    firebase.database().ref("users").on("value", (snap)=>{
      self.setState({ users : snap.val()});
    })
    firebase.database().ref("activity").on("value", (snap)=>{
      var activityObj = snap.val();
      self.setState({ activity : self.formatActivity(activityObj) });
    })
  }

  formatActivity = (activityObj) => {
    var activityKeys = Object.keys(activityObj);
    activityKeys = activityKeys.reverse();
    var ret = [];
    activityKeys.map((key,i ) => {
      ret.push(activityObj[key])
    })
    return ret
  }

  render(){
    const { activity, users } = this.state;
    const { allProductsObj } = this.props;

    return(
      <div style={{
          position : 'fixed',
          right: 0,
          top: 50,
          padding: 5,
          // height: "100%",
          backgroundColor: 'white',
          ...Styles.boxShadow
        }}>
        {activity.map((a, i) => {
          let product = allProductsObj[a.product];
          return (
            <div key={i} style={{fontSize: 10, width: 100}}>

              <br/>
              <div style={{
                  display : 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5
                }}>
                <span style={{width: 100}}>{product.name}</span><br/>
                <img style={{
                    width: 50,
                    height: 50,
                    objectFit: 'contain'
                  }} src={product.image.src}/>
              </div>
              <span>👜 by {users[a.uid].name.split(" ")[0]}</span>
              <hr style={{marginTop: 5, marginBottom: 5}}/>
            </div>
          )
        })}
      </div>
    )
  }
}
