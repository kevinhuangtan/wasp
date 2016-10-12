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
    users: {},
    user: ""
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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({ user : user})
      }
    });
  }

  formatActivity = (outfitsObj) => {
    var outfitsKeys = Object.keys(outfitsObj);
    outfitsKeys = outfitsKeys.reverse();
    var ret = [];
    outfitsKeys.map((key,i ) => {
      outfitsObj[key]['.key'] = key;
      ret.push(outfitsObj[key])
    })
    return ret
  }

  calculateProps = (props) => {
    let propsKeys = Object.keys(props);
    var num_props = 0;
    propsKeys.forEach((propKey, i)=>{
      if(props[propKey]){
        num_props += 1
      }
    })
    return num_props
  }

  addProp = (outfit) => {
    var ref = firebase.database().ref(`outfits/${outfit['.key']}/props/${this.state.user.uid}`);
    ref.once("value", (snap)=>{

      ref.set(!snap.val());
    })
  }

  render(){
    const { outfits, users } = this.state;
    const { allProductsObj } = this.props;
    if(!allProductsObj){return null}
    if(Object.keys(allProductsObj).length == 0){return null};


    return(
      <div style={{
        ...Styles.flexVertical
        }}>
        <br/><br/>
        {outfits.map((outfit, i) => {

          let props = outfit.props;
          let num_props = 0
          if(!props){
            num_props = 0
          }
          else{
            num_props = this.calculateProps(outfit.props);
          }

          let products = outfit.products;
          return (
            <div
              key={i}
              style={{
                display:'block',
                backgroundColor: 'white',
                ...Styles.boxShadow,
                padding: mobile ? 5 : 25,
                width: "95%",
                minWidth: 300 ,
                maxWidth: 650,
                margin: '0 auto',
                marginBottom: 20,
                position: 'relative',

              }}>

              <div
                style={{
                  display : "flex",
                  flexWrap: "wrap",
                  justifyContent: 'center',
                }}>
                  {products.map((product, j) => {
                    return (
                      <div style={{
                          margin: 5,
                          width: mobile ? "45%" : 200

                        }} key={j}>
                        <Product supersmall  product={product} />
                      </div>
                    )
                  })}
              </div>
              <br/>
              <hr style={{marginTop: 5, marginBottom: 5}}/>
              <div style={{padding:10}}>
                <span>outfit created by {users[outfit.uid].name.split(" ")[0] + " " + users[outfit.uid].name.split(" ")[1][0]}</span>
                <br/>
                <span>
                  <span
                    onClick={() => this.addProp(outfit)}
                    style={{
                      fontSize:20,
                      cursor: 'pointer',
                      // opacity: .2
                    }}>
                    👏</span>
                  <span> x {num_props}</span></span>

                <span style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                    float: 'right',
                    opacity: .6,
                  }}>{getTimePassed(outfit.datetime)}</span>
              </div>
            </div>
          )
        }, this)}
      </div>
    )
  }
}
