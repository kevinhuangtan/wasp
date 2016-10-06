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

class BackToTopBtn extends Component {
    render(){
      const { showBackToTop, scrollToTop } = this.props;
      var Button = showBackToTop
        ? <button
            style={styles.backToTopBtn}
            onClick={scrollToTop}>back to top</button>
        : null;
      return Button
    }
}
const ShowingBlock = ({productsLength, tagsSelected, storesSelected}) => {
  var TopText;
  if(tagsSelected.length == 1){
    TopText =
      <span style={styles.tag}>{tagsSelected[0]}</span>
  }
  else{
    TopText =
      <span>
        {tagsSelected.map((tag, i) =>{
          if(i == tagsSelected.length - 1){
            return(
              <span key={i}> <span style={styles.tag}>{tag}</span></span>
            )
          }
          return(
            <span key={i} > <span style={styles.tag}>{tag}</span>,</span>
          )
        })}
      </span>

  }
// , with tags {TopText}
  return (
    <p>{productsLength} results from {storesSelected.length} selected stores</p>
  )
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

export default class SearchView extends Component {
  state = {
    page : 0,
    showBackToTop: false,
    productsLength: 0
  }

  static propTypes = {
    storesSelected: PropTypes.array.isRequired,
    allProductsObj: PropTypes.object.isRequired,
    filteredProductsArr: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
    tagsSelected: PropTypes.array.isRequired
  }


  componentDidMount(){
    document.addEventListener('scroll', this.handleScroll);
    this.detectChangeFilters(this.props.filteredProductsArr);
  }
  componentWillReceiveProps(nextProps) {
    this.detectChangeFilters(nextProps.filteredProductsArr);
  }
  componentWillUnmount(){
    document.removeEventListener('scroll', this.handleScroll);
  }


  loadMore = (p) => {
    if(this.props.view != "SEARCH"){return}

    this.setState({ page : p });
  }
  //////////////// scrolling ///////////////////

  scrollToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  handleScroll = () => {
    var scroll = $(window).scrollTop();
    if(scroll > 3500 ){
      this.setState({ showBackToTop : true });
    }
    else{
      this.setState({ showBackToTop : false });
    }
  }

  // reset page number so products don't have to all refresh
  detectChangeFilters = (filteredProductsArr) => {
    var length = filteredProductsArr.length;
    if(length - this.state.productsLength != 0){
      this.setState( {
        page : 0,
        productsLength : length
      })
    }
  }

  render(){

    const { page, showBackToTop } = this.state;
    const {
      storesSelected,
      tagsSelected,
      allProductsObj,
      filteredProductsArr,
      view
    } = this.props;
    var products =  Object.assign([], filteredProductsArr);
    var hasMore = true;
    if((page + 1) * 20 > products.length){
      hasMore = false;
    }
    var productsSlice = products.slice(0, (page + 1) * 15);

    var Content;
    var ProductList;

    if(productsSlice.length != 0){
      ProductList = productsSlice.map((product, i) => {
        return (
          <Product product={product} key={i}/>
        )
      })
    }
    var Content =
      <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={hasMore}
          threshold={1000}
          loader={<div className="loader">Loading ...</div>}>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {ProductList}
          </div>
      </InfiniteScroll>


    var Showing;
    if(productsSlice.length == 0){
      if(storesSelected.length > 0 && Object.keys(allProductsObj).length == 0){
        Content = <ChasingDots size={100} />
      }
      else{
        Content = <NoProducts tagsSelected={tagsSelected} storesSelected={storesSelected}/>
      }
    }
    else{
      Showing =
        <ShowingBlock
          productsLength={products.length}
          tagsSelected={tagsSelected}
          storesSelected={storesSelected}/>
    }

    return (
      <section style={{
          padding: mobile ? 10 : 0,
          paddingBottom : 100,
        }}>
        <Stores/>
        <div style={{
            maxWidth: 400
          }}>
          <Tags/>
        </div>
        <br/>
        <Prices/>
        <hr/>
        {Showing}
        <BackToTopBtn
          showBackToTop={showBackToTop}
          scrollToTop={this.scrollToTop}/>
        {Content}
      </section>
    )
  }
}
