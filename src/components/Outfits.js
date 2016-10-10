import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import Product from '../containers/Product';

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

export default class Outfits extends Component {
  state = {
    outfits : [],
    users: {}
  }

  static propTypes = {
  }

  componentDidMount(){
    var self = this;
    firebase.database().ref("users").on("value", (snap)=>{
      self.setState({ users : snap.val()});
    })
    firebase.database().ref("outfits").on("value", (snap)=>{
      var outfitsObj = snap.val();
      self.setState({ outfits : self.formatActivity(outfitsObj) });
    })
  }

  formatActivity = (outfitsObj) => {
    var outfitsKeys = Object.keys(outfitsObj);
    outfitsKeys = outfitsKeys.reverse();
    var ret = [];
    outfitsKeys.map((key,i ) => {
      ret.push(outfitsObj[key])
    })
    return ret
  }

  render(){
    const { outfits, users } = this.state;
    const { allProductsObj } = this.props;
    if(!allProductsObj){return null}
    if(Object.keys(allProductsObj).length == 0){return null};

    return(
      <div style={{
        }}>
        {outfits.map((outfit, i) => {


          let products = outfit.products;
          return (
            <div
              key={i}
              style={{
                display:'block',
                backgroundColor: 'white',
                ...Styles.boxShadow,
                padding: 40,
                width: "80%",
                minWidth: 800,
                margin: '0 auto',
                marginBottom: 20,
              }}>
              <div
                style={{
                  display : "flex",
                  flexWrap: "wrap",
                }}>
                  {products.map((product, j) => {
                    return (
                      <Product supersmall key={j} product={product} />
                    )
                  })}
              </div>
              <br/>
              <hr style={{marginTop: 5, marginBottom: 5}}/>
              <span>outfit created by {users[outfit.uid].name.split(" ")[0]}
              <span style={{
                  float: 'right',
                  opacity: .6,
                }}>{getTimePassed(outfit.datetime)}</span></span>

            </div>
          )
        })}
      </div>
    )
  }
}
