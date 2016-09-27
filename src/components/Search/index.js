import React, { PropTypes, Component } from 'react';

import Styles from '../../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import $ from 'jquery';
import InfiniteScroll from 'react-infinite-scroller';
import { ChasingDots } from 'better-react-spinkit'

import Categories from '../../containers/Categories';
import Stores from '../../containers/Stores';
import Prices from '../../containers/Prices';
import Product from '../../containers/Product';
import Welcome from '../../containers/Welcome';

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

export default class SearchView extends Component {
  state = {
    page : 0,
    showBackToTop: false,
    productsLength: 0
  }

  componentDidMount(){
    document.addEventListener('scroll', this.handleScroll);
    this.detectChangeFilters(this.props.filteredProductsArr);
  }
  componentWillReceiveProps(nextProps) {
    this.detectChangeFilters(nextProps.filteredProductsArr);
  }

  loadMore = (p) => {
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
      categorySelected,
      allProductsObj,
      filteredProductsArr,
      view
    } = this.props;
    if(view != "feed"){return null}
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
    if(storesSelected.length > 0 && Object.keys(allProductsObj).length == 0){
      Content = <ChasingDots size={100} />
    }

    return (
      <section>
        <Stores/>
        <Categories/>
        <br/>
        <Prices/>
        <hr/>
        <Welcome/>
        <BackToTopBtn
          showBackToTop={showBackToTop}
          scrollToTop={this.scrollToTop}/>
        {Content}
      </section>
    )
  }
}
