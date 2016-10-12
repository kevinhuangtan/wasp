import React, { PropTypes, Component } from 'react';
import Stores from '../containers/Stores';
import Styles from '../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();


const styles = {
  productImage:{
    cursor: 'pointer'
  },
}

class ProductInfo extends Component {
  render(){
    const { goToProduct, product, savedProducts, storeMap, onClickSave } = this.props;

    var saved = false;
    if(savedProducts.indexOf(product.key) != -1){
      saved = true;
    }

    var Save =
      <span
        style={{cursor: 'pointer', opacity: .3, fontSize : 18}}
        className="hover-underline"
        onClick={onClickSave}>👜</span>
    if(saved){
      Save = <span
        style={{cursor: 'pointer', textDecoration: 'underline', opacity: 1, fontSize : 18}}
        className="hover-underline"
        onClick={onClickSave}>👜</span>
    }

    return (
      <div
        style={{
          display:'flex',
          flexDirection:'row',
          flexWrap:'wrap'}}>
          <div style={{flex:4}}>
            <a href={product.href}
              target="_blank"
              onClick={() => this.goToProduct(product.href)}
              className="hover-opacity"
              style={{
                cursor:'pointer',
                color: Styles.colorText
              }}>{product.name}</a>
            <br/>
            <span style={{color:Styles.red}}>${product.price.toFixed(2)}</span>
            <p>
              <a
                  target="_blank"
                  href={product.href}
                  style={{
                    fontWeight: 'bold',
                    cursor:'pointer',
                    color: Styles.colorText,
                    opacity: .8
                  }}
                  className="hover-opacity"
                  onClick={() => this.goToProduct(product.href)}>
                  {storeMap[product.store]}
                </a>
            </p>
            </div>
        <div style={{flex:1}}>
          {Save}
        </div>
      </div>
    )
  }
}

export default class Product extends Component {

  state = {
    saved : false,
    user: '',
    pressedOnce : false
  };

  static propTypes = {
    savedProducts: PropTypes.array.isRequired,
    storeMap: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
  }

  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({ user : user})

      }
    });
  }
  goToProduct = (url) => {
    window.open(url, '_blank');
  }

  onClickSave = () => {
    var self= this;
    if(!this.state.saved && self.state.user && this.props.view != "BAG"){
      firebase.database().ref("activity").push({
        uid: self.state.user.uid,
        product: self.props.product.key,
        datetime: new Date().getTime(),
        type: "ADD_TO_BAG"
      })
    }
    this.setState({ saved : !this.state.saved })
    this.props.onClickSave(this.props.product);

  }

  deleteProduct = () => {
    if(!this.state.pressedOnce){
      this.setState({ pressedOnce : true })
    }
    else{
      firebase.database().ref(`products/${this.props.product.key}`).remove(function(error){
        console.log(error)
      });
    }

  }

  render(){

    const { savedProducts, storeMap, product, small, supersmall } = this.props;

    if(!product || !product.image){
      return null
    }

    let width;
    let height;

    let fontSize = 14;
    width = mobile ? 140 : 280
    height = mobile ? 150: 300
    if(small){
      width = mobile ? 150 : 220;
      height = mobile ? 170 : 240;
      fontSize = 12;
    }
    if(supersmall){
      width = mobile ? "100%" : 180;
      height = mobile ? 150 : 200;
      fontSize = 9;
    }

    return (
      <div
        style={{
          // overflow: 'hidden',
          width: width,
          fontSize: fontSize
        }}>
        <div
          style={{
            height: mobile ? 200 : 'auto',
            width:"100%",
            overflow:'hidden'
          }}
          target="_blank" href={product.href}>
          <img
              onClick={() => this.goToProduct(product.href)}
              className="hover-opacity"
              style={{
                ...styles.productImage,
                height: 200,
                width: "auto"
              }} src={product.image.src}/>
          </div>
        <br/>
        <ProductInfo
          goToProduct={this.goToProduct}
          product={product}
          storeMap={storeMap}
          onClickSave={this.onClickSave}
          savedProducts={savedProducts}/>
      </div>
    )
  }
}

// console.log(product)
// var deleteButton;
// if(this.state.user.uid == "5jOwzCXFt5gkfB1SmCPpxG3nTRd2"){
//   deleteButton =
//    <span
//      style={{color: 'red', cursor:'pointer', opacity: .3}}
//      onClick={this.deleteProduct}>delete product</span>
// }
