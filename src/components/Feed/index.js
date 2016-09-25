import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import helpers from '../../helpers';
import $ from 'jquery';
import InfiniteScroll from 'react-infinite-scroller';
import Styles from '../../styles';
const storeKeys = [ 'asos', 'topman', 'uo', 'uniqlo', 'hm', 'jcrew', 'forever21'];
import Categories from '../../containers/Categories';
import Stores from '../../containers/Stores';
import Prices from '../../containers/Prices';
import Product from '../../containers/Product';

const colorMain = Styles.colorMain;
const colorSecondary = Styles.colorSecondary;
const colorText = Styles.colorText;

class SearchView extends Component {
  state = {
    page : 0,
    showBackToTop: false,
  }

  ////////////////// loading ///////////////////
  componentDidMount(){
    document.addEventListener('scroll', this.handleScroll);
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

  render(){
    const { page, showBackToTop } = this.state;
    const { storesSelected, categorySelected, savedProducts, filteredProductsArr, onClickSave } = this.props;

    var isStores = storesSelected.length > 0;
    var Notify = isStores ? null :
      <p style={{width:600}}>
        Welcome to WaSP!
        <br/><br/>I made <a target="_blank" href="https://www.youtube.com/watch?v=irCZAR5xQ5A&feature=youtu.be&t=2s">Walt Steve Picasso</a> because I got tired of having a million tabs open whenever I wanted to shop online.<br/>
        <br/>So I made this platform, which is free to use for everyone. WaSP periodically scrapes top menswear sites to get the latest products. It then lets you filter and save them for later.
        <br/><br/>I hope WaSP helps you upgrade your look <i className="em em-fire"></i><i className="em em-fire"></i>
        <br/><br/>Sincerely,<br/><a href="mailto:hello@kevintan.me?body=Hey! My name is Kevin and I like music and making products for people :)">Kevin</a>
        <br/><br/>Start by selecting one or more stores from the right column <span className="blinker">--></span></p>;
    var products =  Object.assign([], filteredProductsArr);
    var hasMore = true;
    if((page + 1)*20 > products.length){
      hasMore = false;
    }
    var productsSlice = products.slice(0, (page + 1) * 15);

    var ProductList;
    if(productsSlice.length != 0){
      ProductList =  productsSlice.map((product, i) => {
        return (
          <Product savedProducts={savedProducts} product={product} onClickSave={onClickSave} key={i}/>
        )
      })
    }

    return (
      <section>
        <Stores/>
        <Categories/>
        <br/>
        <Prices/>
        <hr/>
        {Notify}
        <button
            style={{ position: 'fixed',
              zIndex: 1000, left:0,right:0, width: 150, margin: '0 auto',
              borderRadius: 5, top: 70,
              boxShadow: '0px 2px 2px rgba(0,0,0,.2)',
              backgroundColor: Styles.black,
              color: Styles.offwhite,
              borderWidth:0,
              display: showBackToTop ? "block" : "none"
            }}
            onClick={this.scrollToTop}>back to top</button>
        <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={hasMore}
            threshold={1000}
            loader={<div className="loader">Loading ...</div>}>
            <div  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {ProductList}
            </div>
        </InfiniteScroll>
      </section>
    )
  }
}

class SavedView extends Component {
  render(){
    var { savedProducts, allProductsObj, onClickSave } = this.props;
    var ProductList;
    if(savedProducts.length != 0){
      ProductList = savedProducts.map((productKey, i) => {
        return (
          <Product savedProducts={savedProducts} product={allProductsObj[productKey]} onClickSave={onClickSave} key={i}/>
        )
      })
    }
    else{
      return ( <h3>No products saved!</h3>)
    }

    return (
        <div  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {ProductList}
        </div>
    )
  }
}

class HomeContainer extends Component {
  state = {
    savedProductsView: false
  };

  onClickSave = () =>{
    return
  }
  toggleSavedProductsView = () => {
    this.setState({ savedProductsView : !this.state.savedProductsView});
  }

  render() {

    const { storesSelected, categorySelected, savedProducts, allProductsObj, filteredProductsArr } = this.props;
    var View =
      <SearchView
        storesSelected={storesSelected}
        categorySelected={categorySelected}
        filteredProductsArr={filteredProductsArr}
        savedProducts={savedProducts}
        onClickSave={this.onClickSave}
      />
    var text = `saved products (${savedProducts.length})`;
    var isSaved = savedProducts.length > 0;
    if(this.state.savedProductsView){
      View =
        <SavedView
          onClickSave={this.onClickSave}
          allProductsObj={allProductsObj}
          savedProducts={savedProducts}/>
      text = "back to search"
    }

    return (
      <div style={{padding : 40, paddingRight:0, marginTop: 30, marginRight: 300}}>
        <button
          onClick={this.toggleSavedProductsView}
          style={{
            position: 'fixed', bottom: 25, right: 25, borderRadius : 5,
            backgroundColor: isSaved ? colorMain : colorSecondary,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            zIndex: 100,
            borderWidth: 0,
            opacity: isSaved ? 1 : .5,
            color: isSaved ? 'white' : colorText}}>
            {text}
        </button>
        {View}
      </div>
    )
  }
}

const Home = ({
    storesSelected,
    categorySelected,
    filteredProductsArr,
    allProductsObj,
    savedProducts,
    onClickSave
  }) => {

  return (
    <HomeContainer
      storesSelected={storesSelected}
      filteredProductsArr={filteredProductsArr}
      allProductsObj={allProductsObj}
      categorySelected={categorySelected}
      savedProducts={savedProducts}
      onClickSave={onClickSave}
    />
  )
}
export default Home
