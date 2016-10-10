import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const getTimePassed = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " h";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " m";
    }
    return Math.floor(seconds) + " sec";
}

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
    if(Object.keys(allProductsObj).length == 0){return null};

    let activitySlice = activity.slice(0,15);
    return(
      <div style={{
          position : 'fixed',
          right: 0,
          top: 50,
          backgroundColor: 'white',
          ...Styles.boxShadow,
          padding: 10,
          borderWidth: 0,
          display : mobile ? "none": "block"
        }}>
        {activitySlice.map((a, i) => {
          if(!(a.product in allProductsObj)){
            return null
          }
          let product = allProductsObj[a.product];
          let productName = product.name.length > 20 ? product.name.slice(0,15) + ".." : product.name;
          return (
            <div key={i} style={{fontSize: 10, width: 110}}>
              <div style={{
                  display : 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8
                }}>
                <span
                  style={{
                    width: 50,
                    flex: 3
                  }}
                  >{productName}</span>
                <div style={{
                    backgroundImage: `url(${product.image.src})`,
                    height: 50,
                    width: 50,
                    backgroundSize: 'cover',
                    flex:2,
                    padding: 2
                  }}>
                </div>
              </div>
              <span>👜 by {users[a.uid].name.split(" ")[0]}
              <span style={{
                  float: 'right',
                  opacity: .6,
                }}>{getTimePassed(a.datetime)}</span></span>
              <hr style={{marginTop: 5, marginBottom: 5}}/>
            </div>
          )
        })}
      </div>
    )
  }
}
