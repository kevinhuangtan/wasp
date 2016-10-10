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
    if(!product){
      return null
    }
    var saved = false;
    if(savedProducts.indexOf(product.key) != -1){
      saved = true;
    }
    var deleteButton;
    if(this.state.user.uid == "5jOwzCXFt5gkfB1SmCPpxG3nTRd2"){
      deleteButton =
       <span
         style={{color: 'red', cursor:'pointer', opacity: .3}}
         onClick={this.deleteProduct}>delete product</span>
    }

    var Save =
      <span
        style={{cursor: 'pointer', opacity: .3, fontSize : 18}}
        className="hover-underline"
        onClick={this.onClickSave}>👜</span>
    if(saved){
      Save = <span
        style={{cursor: 'pointer', textDecoration: 'underline', opacity: 1, fontSize : 18}}
        className="hover-underline"
        onClick={this.onClickSave}>👜</span>
    }
    let width;
    let height;

    let fontSize = 14;
    width = mobile ? 140 : 280
    height = mobile ? 150: 300
    if(small){
      width = 220
      height = 240;
      fontSize = 12;
    }
    if(supersmall){
      width = 180
      height = 200;
      fontSize = 10;
    }

    return (
      <div
        style={{
          width: width,
          fontSize: fontSize
        }}>
        <a href={product.href}>
          <img
              onClick={() => this.goToProduct(product.href)}
              className="hover-opacity"
              style={{
                ...styles.productImage,
                height: height,
                width: 'auto'

              }} src={product.image.src}/>
        </a>
        <br/><br/>
        <div style={{
            width: width - 30,
          }}>
          <a href={product.href}
            onClick={() => this.goToProduct(product.href)}
            className="hover-opacity"
            style={{
              cursor:'pointer',
              color: Styles.colorText
            }}>{product.name}</a>
          <p><span style={{color:Styles.red}}>${product.price.toFixed(2)}</span> from&nbsp;
            <a href={product.href}
              style={{
                cursor:'pointer',
                color: Styles.colorText
              }}
              className="hover-opacity"
              onClick={() => this.goToProduct(product.href)}>
              <u>{storeMap[product.store]}</u>
              </a>
          </p>
          <p>
            {Save}
          </p>
        </div>
      </div>
    )
  }
}
