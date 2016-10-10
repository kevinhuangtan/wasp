import React, { PropTypes, Component } from 'react';

import Styles from '../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import $ from 'jquery';
import InfiniteScroll from 'react-infinite-scroller';
import { ChasingDots } from 'better-react-spinkit'

import Categories from '../containers/Categories';
import Stores from '../containers/Stores';
import Prices from '../containers/Prices';
import Product from '../containers/Product';
import Welcome from '../containers/Welcome';
import Tags from '../containers/Tags';

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


const NoProducts = ({tagsSelected, storesSelected}) => {
  if(storesSelected.length == 0){
    return <p>select one or more stores <span style={{fontSize: 20}}>☝️</span>🏽</p>
  }
  var TopText;
  if(tagsSelected.length == 1){
    TopText =
      <p>
        there are no products with tag <span style={styles.tag}>{tagsSelected[0]}</span>
      </p>
  }
  else{
    TopText =
      <p>
        there are no products with tags {tagsSelected.map((tag, i) =>{
          if(i == tagsSelected.length - 1){
            return(
              <span key={i}> <span style={styles.tag}>{tag}</span></span>
            )
          }
          return(
            <span key={i} > <span style={styles.tag}>{tag}</span>,</span>
          )
        })}
        &nbsp;<span style={{fontSize: 20}}>😭😭😭</span>
      </p>

  }
//       {TopText}

  return (
    <div>
      0 results. Try removing tags or selecting more stores.
    </div>
  )
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}




export default class SearchView extends Component {
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
    this.randomize()
  }

  componentWillReceiveProps(nextProps){

    this.randomize()
  }

  randomize = () => {
    console.log('random', this.props.allProductsObj.length)

    let products = this.props.allProductsObj || {};
    var ret = [];
    let currTags = [];
    let currStores = [];
    var productKeys = Object.keys(products) || [];
    if(productKeys.length == 0){
      return []
    }
    const product_max = 5;
    while(ret.length < product_max){
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
    console.log('random' , ret)
    this.setState({ randomProducts : ret})
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

    let Loader;
    if(Object.keys(allProductsObj).length == 0 || !allProductsObj){
      Loader = <ChasingDots/>
    }

    return (
      <section style={{
          padding: mobile ? 10 : 0,
          paddingBottom : 100,
        }}>
        {/*}
        <Stores/>
        <div style={{
            maxWidth: 400
          }}>
          <Tags/>
        </div>
        <br/>
        <Prices/>
        <hr/>*/}
        {Loader}
        <button onClick={() => this.randomize()}>Random</button>
        <div style={{
            display: 'flex',
            flexWrap:'wrap',
            flexDirection:'row'
          }}>

          {randomProducts.map((product, i)=>{
            return <Product small product={product} key={i}/>
          })}
        </div>
      </section>
    )
  }
}
