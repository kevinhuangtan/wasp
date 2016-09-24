import React, { PropTypes, Component } from 'react';
import Stores from '../../containers/Stores';

const styles = {
  productImage:{
    height: 300,
    cursor: 'pointer'
  },
}


export default class Product extends Component {

  state = {
    saved : false
  };
  goToProduct = (url) => {
    window.open(url, '_blank');
  }

  onClickSave = () => {
    this.setState({ saved : !this.state.saved })
    this.props.onClickSave(this.props.product);
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

    var Save =
      <span
        style={{cursor: 'pointer'}}
        className="hover-underline"
        onClick={this.onClickSave}>save</span>
    if(saved){
      Save = <span
        style={{cursor: 'pointer', textDecoration: 'underline'}}
        className="hover-underline"
        onClick={this.onClickSave}>saved</span>
    }
    return (
      <div
        style={{margin: 15, width: 300}}>
        <img
          onClick={() => this.goToProduct(product.href)}
          className="hover-opacity"
          style={styles.productImage} src={product.image.src}/>
        <br/><br/>
        <p
          onClick={() => this.goToProduct(product.href)}
          className="hover-opacity"
          style={{cursor:'pointer'}}>{product.name}</p>
        <p>${product.price.toFixed(2)} from&nbsp;
          <u
            style={{cursor:'pointer'}}
            className="hover-opacity"
            onClick={() => this.goToProduct(product.href)}>{storeMap[product.store]}</u></p>
        <p>
          {Save}
        </p>
      </div>
    )
  }
}
