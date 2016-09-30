import React, { PropTypes, Component } from 'react';
import Stores from '../containers/Stores';
import Styles from '../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();


const styles = {
  productImage:{
    height: mobile ? 150: 300,

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

    const { savedProducts, storeMap, product } = this.props;
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
        style={{cursor: 'pointer'}}
        className="hover-underline"
        onClick={this.onClickSave}>add to bag</span>
    if(saved){
      Save = <span
        style={{cursor: 'pointer', textDecoration: 'underline'}}
        className="hover-underline"
        onClick={this.onClickSave}>bagged</span>
    }
    return (
      <div
        style={{
          margin: mobile ? 10 : 25,
          width: mobile ? 140 : 280
        }}>
        <img
          onClick={() => this.goToProduct(product.href)}
          className="hover-opacity"
          style={styles.productImage} src={product.image.src}/>
        <br/><br/>
        <div style={{
            width: mobile ? 125 : 250,
          }}>
          <p
            onClick={() => this.goToProduct(product.href)}
            className="hover-opacity"
            style={{cursor:'pointer'}}>{product.name}</p>
          <p><span style={{color:Styles.red}}>${product.price.toFixed(2)}</span> from&nbsp;
            <u
              style={{cursor:'pointer'}}
              className="hover-opacity"
              onClick={() => this.goToProduct(product.href)}>{storeMap[product.store]}</u></p>
          <p>
            {Save}
          </p>
        </div>
      </div>
    )
  }
}
