import React, { PropTypes, Component } from 'react';

import Styles from '../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import { ChasingDots } from 'better-react-spinkit'

import Outfits from '../containers/Outfits';
import Product from '../containers/Product'

const styles = {
  backToTopBtn: {
    position: 'fixed',
    zIndex: 1000, left:0,right:0, width: 150, margin: '0 auto',
    borderRadius: 5,
    top: mobile ? 20 : 70,
    boxShadow: '0px 2px 2px rgba(0,0,0,.2)',
    backgroundColor: Styles.black,
    color: Styles.offwhite,
    borderWidth:0,
  },
  container:{
    padding: mobile ? 15 : 40,
    marginTop: mobile ? 0 : 30,
    paddingRight: mobile ? 0 : 50,
    paddingBottom: mobile ? 150 : 0
  },
  tag:{
    textDecoration: 'underline',
    color: Styles.red
  }
}




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}



const PRODUCT_MAX = 4;

export default class RandomView extends Component {
  state = {
    page : 0,
    showBackToTop: false,
    productsLength: 0,
    randomNumbers : [],
    randomProducts : []
  }

  static propTypes = {
    storesSelected: PropTypes.array.isRequired,
    allProductsObj: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    tagsSelected: PropTypes.array.isRequired
  }

  componentDidMount(){
    this.randomize();
    var self = this;
    // retrieve user's bag from previous session
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({ user : user})
      }
    });
  }

  componentWillReceiveProps(nextProps){

    this.randomize()
  }

  randomize = () => {

    let products = this.props.allProductsObj || {};
    var ret = [];
    let currTags = [];
    let currStores = [];
    var productKeys = Object.keys(products) || [];
    if(productKeys.length == 0){
      return []
    }
    while(ret.length < PRODUCT_MAX){
      let randInt = getRandomInt(0, productKeys.length);

      let prod = products[productKeys[randInt]];

      let pushProduct = true;

      prod.tags.forEach((tag, i) => {
        if(currTags.indexOf(tag) != -1){
          pushProduct = false
        }
      })
      if(currStores.indexOf(prod  .store) != -1){
        pushProduct = false
      }
      if(pushProduct){
        ret.push(prod);
        currTags = currTags.concat(prod.tags);
        currStores.push(prod.store);
      }
    }
    this.setState({ randomProducts : ret})
  }
  switchOut = (switchOutIndex) => {

    let products = this.props.allProductsObj || {};
    var productKeys = Object.keys(products) || [];

    let ret = Object.assign([], this.state.randomProducts);
    let currTags = [];
    let currStores = [];
    ret.forEach((prod, i) => {
      if(i!=switchOutIndex){
        currTags = currTags.concat(prod.tags);
        currStores.push(prod.store);
      }
    })

    ret.splice(switchOutIndex,1);


    while(ret.length < PRODUCT_MAX){
      let randInt = getRandomInt(0, productKeys.length);

      let prod = products[productKeys[randInt]];

      let pushProduct = true;

      prod.tags.forEach((tag, i) => {
        if(currTags.indexOf(tag) != -1){
          pushProduct = false
        }
      })
      if(currStores.indexOf(prod  .store) != -1){
        pushProduct = false
      }
      if(pushProduct){
        ret.splice(switchOutIndex, 0, prod);
        currTags = currTags.concat(prod.tags);
        currStores.push(prod.store);
      }
    }

    this.setState({ randomProducts : ret})

  }
  publish = () => {
    var self = this;

    if(self.state.user){

      firebase.database().ref("outfits").push({
        uid: self.state.user.uid,
        products: self.state.randomProducts,
        datetime: new Date().getTime(),
        type: "ADD_TO_BAG"
      })
    }


  }
  render(){

    const { page,
      showBackToTop,
      randomProducts,
      randomize
    } = this.state;
    const {
      storesSelected,
      tagsSelected,
      allProductsObj,
      view,
    } = this.props;

    if(Object.keys(allProductsObj).length == 0 || !allProductsObj){
      return <ChasingDots/>
    }


    return (
      <section>
        <p style={{
            cursor: 'pointer'
          }}
          onClick={()=>this.props.setView("SEARCH")}>
        <a>back to search</a></p>

        <br/><br/>
        <div style={{
            padding: 10,
            border: Styles.border,
            boxShadow: Styles.boxShadow,
            display: 'flex',
            flexWrap:'wrap',
            flexDirection:'row',
            justifyContent: 'center',
            height: 450
          }}>
            {randomProducts.map((product, i)=>{
              return (
                <div key={i} style={{
                    margin: 5
                  }}>
                  <a
                    onClick={()=>this.switchOut(i)}
                    style={{
                      cursor:'pointer'
                    }}>switch out</a>
                  <br/><br/>
                  <Product small product={product} />
                </div>
              )
            })}
        </div>
        <div style={{
          textAlign: 'center',
          padding: 10,
          }}>
          <button
            style={{
              margin: 10
            }}
            onClick={() => this.randomize()}>RANDOMIZE</button>
          <button
            style={{
              margin: 10
            }}
            onClick={() => this.publish()}>PUBLISH</button>
            <br/><br/>
            <br/><br/>
            <p><u>outfits created by peers</u></p>
        </div>

        <Outfits/>
      </section>
    )
  }
}
