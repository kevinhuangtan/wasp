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


class ProductControl extends Component {
  render() {
    const { remove, switchOut, index } = this.props;
    return (
      <div style={{
          width: "50%",
          marginBottom: 5,
          fontSize: 9
        }}>
        <span
          onClick={()=>switchOut(index)}
          style={{
            cursor:'pointer',
            backgroundColor: Styles.red,
            color: 'white',
            padding: 5,
            borderRadius: 5
          }}>swap</span>
        <span
          onClick={()=>remove(index)}
          style={{
            marginLeft: 10,
            backgroundColor: Styles.red,
            color: 'white',
            padding: 5,
            borderRadius: 5,
            cursor:'pointer'
          }}>remove</span>

      </div>

    )
  }
}


const PRODUCT_MAX = 4;

export default class RandomView extends Component {
  state = {
    page : 0,
    showBackToTop: false,
    productsLength: 0,
    randomNumbers : [],
    randomProducts : [],
    product_max : 4
  }

  static propTypes = {
    storesSelected: PropTypes.array.isRequired,
    allProductsObj: PropTypes.object.isRequired,
    view: PropTypes.string.isRequired,
    tagsSelected: PropTypes.array.isRequired
  }

  componentDidMount(){
    var self = this;
    // retrieve user's bag from previous session
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({ user : user})
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.createWeights(nextProps.allProductsObj)
  }
  createWeights = (allProductsObj) => {
    if(!allProductsObj){ return }
    var allProductKeys = Object.keys(allProductsObj);
    var storeProportions = {}
    allProductKeys.forEach((productKey) => {
      var product = allProductsObj[productKey];

      if(!(product.store in storeProportions)){
        storeProportions[product.store] = 1;
      }
      else{
          storeProportions[product.store] += 1;
      }

    })

    let total_products_length = allProductKeys.length;
    var weights = {};
    var storeProportionsKeys =  Object.keys(storeProportions);
    var num_stores = storeProportionsKeys.length;

    var lowest = 100;

    // calculate P, find lowest
    storeProportionsKeys.forEach((storeKey) =>{
        storeProportions[storeKey] = storeProportions[storeKey]/total_products_length;
        if(storeProportions[storeKey] < lowest){
          lowest = storeProportions[storeKey];
        }
    })


    storeProportionsKeys.forEach((storeKey) =>{
      weights[storeKey] = lowest / storeProportions[storeKey]
    })

    // W_i = P_lowest / P_i
    this.setState({ weights : weights });


  }
  uniqueTag = (product, currTags) => {
    var uniqueTag = true;
    if(product.tags){
      product.tags.forEach((tag, i) => {
        if(currTags.indexOf(tag) != -1){
          uniqueTag = false
        }
      })
    }
    return uniqueTag
  }

  randomStore = (product, weights) => {
    var store = product.store;
    var weight = weights[store];
    var random = Math.random();
    if(random < weight){
      return true
    }
    return false
  }

  chooseRandomProduct = (products, currTags) => {
    var productKeys = Object.keys(products);
    let found = false;
    let product;
    while(!found){
      let randInt = getRandomInt(0, productKeys.length);
      product = products[productKeys[randInt]];

      if(
        product
        && this.uniqueTag(product, currTags)
        && this.randomStore(product, this.state.weights)
      ){
        found = true
      }
      if(product.store == "mrporter"){
        found = false;
      }
    }
    currTags = currTags.concat(product.tags);

    return product

  }
  randomize = () => {
    let products = this.props.allProductsObj || {};
    let ret = [];
    let currTags = [];
    var productKeys = Object.keys(products) || [];
    if(productKeys.length == 0){
      return []
    }
    while(ret.length < this.state.product_max){
      var product = this.chooseRandomProduct(products, currTags);
      ret.push(product);
      currTags = currTags.concat(product.tags);
    }
    this.setState({ randomProducts : ret})
  }
  switchOut = (switchOutIndex) => {

    let products = this.props.allProductsObj || {};
    var productKeys = Object.keys(products) || [];

    let ret = Object.assign([], this.state.randomProducts);
    let currTags = [];
    ret.forEach((prod, i) => {
      if(i!=switchOutIndex){
        currTags = currTags.concat(prod.tags);
      }
    })

    ret.splice(switchOutIndex,1);

    while(ret.length < this.state.product_max){
      ret.splice(switchOutIndex, 0, this.chooseRandomProduct(products, currTags));
    }

    this.setState({ randomProducts : ret})

  }
  remove = (removeIndex) => {
    if(this.state.product_max > 1){
      var randomProducts = Object.assign([], this.state.randomProducts);
      randomProducts.splice(removeIndex, 1);
      this.setState({
        product_max : this.state.product_max - 1,
        randomProducts : randomProducts
      })
    }
  }
  publish = () => {
    var self = this;
    var randomProducts = this.state.randomProducts;

    if(self.state.user){

      firebase.database().ref("outfits").push({
        uid: self.state.user.uid,
        products: randomProducts,
        datetime: new Date().getTime(),
        type: "ADD_TO_BAG",
        props: {}
      })

      // create outfit edges
      var productsUpdate = {};
      randomProducts.forEach((product)=>{
        // productsUpdate[product.key] = {}; // replace with before
        var updateProductEdges = {};
        randomProducts.map((randProduct , i) => {
          if(randProduct.key != product.key){
            if(product.outfitEdges && product.outfitEdges[randProduct.key]){
              updateProductEdges[randProduct.key] = product.outfitEdges[randProduct.key] + 1;
            }
            else{
              updateProductEdges[randProduct.key] = 1;

            }
          }
        })
        productsUpdate[`${product.key}/outfitEdges`] = updateProductEdges;
      })

      firebase.database().ref("products").update(productsUpdate);
    }
  }
  increaseProducts = () => {
    if(this.state.product_max < 4){
      this.setState({ product_max : this.state.product_max + 1}, function(){
        this.switchOut(this.state.randomProducts.length);

      })
    }
  }
  decreaseProducts = () => {
    if(this.state.product_max > 1){
      this.setState({
        product_max : this.state.product_max - 1,
        randomProducts : this.state.randomProducts.slice(0, this.state.randomProducts.length - 1)
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


    console.log(randomProducts)
    if(Object.keys(allProductsObj).length == 0 || !allProductsObj){
      return <div style={{
          marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        }}><ChasingDots size={100}/></div>
    }
    let ClickRandomize;
    // if(randomProducts.length == 0){
    //   ClickRandomize =
    //   <h2
    //     style={{
    //       fontSize: mobile ? 20 : 'auto',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'center',
    //     }}>click RANDOMIZE to get started</h2>
    // }
    return (
      <section>
        <p>build your outfit</p>
        <div style={{
            padding: 10,
            border: Styles.border,
            boxShadow: Styles.boxShadow,
            display: 'flex',
            flexWrap:'wrap',
            flexDirection:'row',
            justifyContent: 'center',
            alignItems:'center',
            height: 'auto',
            minWidth: 300,
            position: 'relative',
            margin: 10
          }}>
            {randomProducts.map((product, i)=>{
              return (
                <div key={i} style={{
                    margin: 5,
                    width: mobile ? "45%" : 200
                  }}>

                  <Product supersmall product={product} />
                    <ProductControl
                      index={i}
                      remove={this.remove}
                      switchOut={this.switchOut}/>
                </div>
              )
            })}
            <div
              className="noselect"
              style={{
                flex: 1,
                width: "100%",
                display: randomProducts.length < 4 ? 'flex' : 'none',
                justifyContent:'center',
                alignItems: 'center',
                height: 200
              }}>
                <div
                  onClick={()=>this.increaseProducts()}

                  style={{
                    // flex: 1,
                    border : Styles.border,
                    width: 100,
                    height: 100,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent:'center',
                    alignItems: 'center',

                }}>
                  <span
                    style={{
                      fontSize:35,
                      cursor: 'pointer'
                    }}>+</span>

                </div>
            </div>
        </div>

        <div style={{
          textAlign: 'center',
          padding: 10,
          display: 'flex',
          flexDirection:'row'
          }}>
          <button
            style={{
              margin: 5
            }}
            onClick={() => this.randomize()}>RANDOMIZE</button>
          <button
            style={{
              margin: 5
            }}
            onClick={() => this.publish()}>SAVE</button>
            <br/><br/>
            <hr/>
            <br/>
        </div>
        <br/>

        <Outfits/>
        <br/><br/><br/><br/><br/><br/><br/>
      </section>
    )
  }
}
