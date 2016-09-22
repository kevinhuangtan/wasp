import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import helpers from '../../helpers';
import $ from 'jquery';
import InfiniteScroll from 'react-infinite-scroller';
import Styles from '../../styles';
var storeKeys = [ 'asos', 'topman', 'uo', 'uniqlo', 'hm', 'jcrew', 'forever21'];

var colorMain = '#575D7E';

const styles = {
  storeFilterSelected:{
    backgroundColor: colorMain,
    boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
    borderRadius: '8px',
    borderWidth: '0',
    margin: 10,
    marginBottom: 5,
    display: 'inline-block',
    color: 'white',
  },
  storeFilter:{
    backgroundColor: '#E7E7E7',
    boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
    borderRadius: '8px',
    borderWidth: '0',
    margin: 10,
    marginBottom: 5,
    display: 'inline-block',
    color: '#737373',
    opacity: .7

  },
  productImage:{
    height: 300,
    cursor: 'pointer'
  },
  priceInput:{
    width: 60,
    margin: 20,
    marginBottom: 0,
    marginTop: 0
  }
}

class StoreFilter extends Component {

  handleClick = () => {
    this.props.storeFilterClick(this.props.store);
  };

  render(){
    const { store, storeFilters, storeFiltersSelected, total } = this.props;

    var text = `${store} (${total})`

    if(storeFiltersSelected.indexOf(store) == -1){
      return (
        <button className="hover-opacity-reverse" onClick={this.handleClick} style={styles.storeFilter} onClick={this.handleClick}>{text}</button>
      )
    }
    return (
      <button onClick={this.handleClick} style={styles.storeFilterSelected} onClick={this.handleClick}>{text}</button>
    )

  }
}

class StoreFilters extends Component {

  handleClick = () => {
    this.props.storeFilterClick(this.props.store);
  };

  calculateStoreTotals = (products) => {
    var storeTotals = {};
    storeKeys.forEach((storeKey)=>{
      storeTotals[storeKey] = 0;
    })
    products.forEach((product, i) =>{
      var storeKey = product.store;
      if(storeKey in storeTotals){
        storeTotals[storeKey] += 1;
      }
      else{
        storeTotals[storeKey] = 1;
      }
    })
    return storeTotals

  }

  render(){
    const { storeFilters, storeFiltersSelected, storeFilterClick, products } = this.props;

    var storeTotals = this.calculateStoreTotals(products);
    return (
      <div style={{position: 'fixed', right: 0, display: 'flex', flexDirection:'column', alignItems:'flex-end', padding: 20}}>
        <p style={{opacity:.7, marginRight: 10}}><u>select sources</u></p>
        {storeFilters.map((store, i) => {
          return (
            <StoreFilter
              key={i}
              store={store}
              storeFilters={storeFilters}
              storeFiltersSelected={storeFiltersSelected}
              total={storeTotals[store]}
              storeFilterClick={storeFilterClick}/>
          )
        })}
      </div>
    )
  }
}

class CategoryFilter extends Component {

  handleClick = () => {
    this.props.categoryFilterClick(this.props.category);
  };

  render(){
    const { category, categoryFilters, categoryFilterSelected } = this.props;

    if(category != categoryFilterSelected){
      return (
        <button className="hover-opacity-reverse" onClick={this.handleClick} style={styles.storeFilter} onClick={this.handleClick}>{category}</button>
      )
    }
    return (
      <button onClick={this.handleClick} style={styles.storeFilterSelected} onClick={this.handleClick}>{category}</button>
    )

  }
}

class CategoryFilters extends Component {

  render(){
    const { categoryFilters, categoryFilterSelected, categoryFilterClick } = this.props;

    return (
      <div>
        {categoryFilters.map((category, i) => {
          return (
            <CategoryFilter
              key={i}
              category={category}
              categoryFilters={categoryFilters}
              categoryFilterSelected={categoryFilterSelected}
              categoryFilterClick={categoryFilterClick}/>
          )
        })}
      </div>
    )

  }
}

class Product extends Component {

  state = {
    saved : false
  };
  goToProduct = (url) => {
    window.open(url, '_blank');
  }

  saveProduct = () => {
    this.setState({ saved : !this.state.saved })
    this.props.saveProduct(this.props.product);
  }

  render(){
    const { product } = this.props;
    return (
      <div
        style={{margin: 15, width: 300}}>
        <img
          onClick={() => this.goToProduct(product.url)}
          className="hover-opacity"
          style={styles.productImage} src={product.img}/>
        <br/><br/>
        <p
          onClick={() => this.goToProduct(product.url)}
          className="hover-opacity"
          style={{cursor:'pointer'}}>{product.name}</p>
        <p>${product.price.toFixed(2)} from <b>{product.store}</b></p>
        <p>
          <span
            style={{cursor: 'pointer'}}
            className="hover-underline"
            onClick={this.saveProduct}>{this.state.saved ? "saved" : "save"}</span>
          {/*}<span
            className="hover-underline"
            onClick={() => this.goToProduct(product.url)}
            style={{float:'right', cursor:'pointer', }}>
            visit page</span>*/}

        </p>
      </div>
    )

  }
}


export default class Home extends Component {

  state = {
    storeFilters : storeKeys, // HACK:
    storeFiltersSelected: [],
    categoryFilters : ['all', 'sweaters', 'loungewear', 'hoodies', 'jackets', 'shirts', 'denim', 'cardigans', 'pants', 'tees', 'polos', 'sweatpants', 'basics','vintage' ],
    categoryFilterSelected: "all",
    allProducts : [],
    page : 0,
    showBackToTop: false,
    priceFloor : 0,
    priceCeiling : 1000,
    savedProducts: []
  };

  ////////////////// loading ///////////////////
  componentDidMount(){
    document.addEventListener('scroll', this.handleScroll);

    var refProducts = firebase.database().ref('products');
    refProducts.on('value', (snap) => {
      this.setState({ products : snap.val()});
      this.setProducts(snap.val());
    });
  }

  setProducts = (products) => {
    var productsRet = [];
    var productKeys = Object.keys(products);
    for(var i=0; i<productKeys.length; i++){
      var key = productKeys[i];

      var product = products[key];
      if(product.price && product.name && product.image && product.category){
        // necessary ?
        productsRet.push({
          store: product.store,
          name: product.name,
          price: parseFloat(product.price),
          url: product.href,
          img: product.image.src,
          category: product.category,
          key: product.key
        })
      }
    }

    this.setState({ allProducts: productsRet });
  }
  loadMore = (p) => {
    this.setState({ page : p });
  }

  ////////////// filter and sort ///////////////

  filterByStore = (product) => {
    var storeFiltersSelected = this.state.storeFiltersSelected;
    if(storeFiltersSelected == 'all'){
      return true
    }
    if(storeFiltersSelected.indexOf(product.store) == -1){
      return false
    }
    return true
  }
  filterByPrice = (product) => {
    if(product.price > this.state.priceFloor && product.price < this.state.priceCeiling){
      return true
    }
    return false
  }
  filterByCategory = (product) => {
    if(this.state.categoryFilterSelected == 'all'){
      return true
    }
    if(product.category.indexOf(this.state.categoryFilterSelected) == -1){
      return false
    }
    return true
  }
  storeFilterClick = (store) => {
    var storeFiltersSelected = this.state.storeFiltersSelected;
    var index = storeFiltersSelected.indexOf(store);
    if(index == -1){
      storeFiltersSelected.push(store);
    }
    else{
      storeFiltersSelected.splice(index, 1);
    }
    this.setState({
      storeFiltersSelected : storeFiltersSelected,
      page: 0
    });
  }
  categoryFilterClick = (category) => {
    this.setState({
      categoryFilterSelected : category,
      page: 0
    });
  }
  filterProductsByCategory = (products) => {
    var ret = [];
    products.forEach((product, i) => {
      if(!this.filterByCategory(product)){
        return
      }
      ret.push(product);
    });
    return ret
  }
  filterProductsByStore = (products) => {
    var ret = [];
    products.forEach((product, i) => {
      if(!this.filterByStore(product)){
        return
      }
      ret.push(product);
    });
    return ret
  }
  filterProductsByPrice = (products) => {
    var ret = [];
    products.forEach((product, i) => {
      if(!this.filterByPrice(product)){
        return
      }
      ret.push(product);
    });
    return ret
  }
  sortBy = (products) => {
    return products.sort((a,b)=>{
      return a.price - b.price
    })
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
  handleInputChange = () => {
    this.setState({
      priceFloor : this.refs.priceFloor.value,
      priceCeiling : this.refs.priceCeiling.value,
    })
  }

  saveProduct = (product) => {
    console.log(product)
    var savedProducts = this.state.savedProducts;
    var productKey = product.key;
    console.log(product)
    var index = savedProducts.indexOf(productKey);
    if(index == -1){
      savedProducts.push(productKey);
    }
    else{
      savedProducts.splice(index, 1);
    }
    this.setState({ savedProducts : savedProducts });
  }

  render() {

    const {
      page, storeFilters, storeFiltersSelected,
      categoryFilters, categoryFilterSelected, allProducts, showBackToTop,
      priceFloor, priceCeiling,
      savedProducts} = this.state;

    var productsFilteredByCategory = this.filterProductsByCategory(allProducts);
    var products = this.filterProductsByStore(productsFilteredByCategory);
    products = this.filterProductsByPrice(products);
    products = this.sortBy(products);

    var hasMore = true;
    if((page + 1)*20 > products.length){
      hasMore = false;
    }
    var productsSlice = products.slice(0, (page + 1) * 15);

    var ProductList;
    if(productsSlice.length != 0){
      ProductList =  productsSlice.map((product, i) => {
          return (
            <Product product={product} saveProduct={this.saveProduct} key={i}/>
          )
        })
    }
    var Notify;
    if(storeFiltersSelected.length == 0){
      Notify = <h2 style={{float:'right'}}>select source(s) --------></h2>
    }

    console.log(savedProducts)
    var ScrollToTopButton;
    if(showBackToTop){
      ScrollToTopButton =
        <button style={{ position: 'fixed',
          zIndex: 1000, left:0,right:0, width: 150, margin: '0 auto',
          borderRadius: 5, top: 70,
          boxShadow: '0px 2px 2px rgba(0,0,0,.2)',
          backgroundColor: Styles.black,
          color: Styles.offwhite,
          borderWidth:0 }}
          onClick={this.scrollToTop}>back to top</button>
    }

    return (
      <div style={{padding : 40, marginTop: 30, marginRight: 200}}>
        <div
          style={{
            position: 'fixed', bottom: 25, right: 25, borderRadius : 5,
            backgroundColor: colorMain,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            color: 'white'}}>
          <p style={{color: 'white', margin: 0}}>saved products ({savedProducts.length}) </p>
        </div>
        <StoreFilters
          storeFilters={storeFilters}
          storeFiltersSelected={storeFiltersSelected}
          storeFilterClick={this.storeFilterClick}
          products={productsFilteredByCategory}
        />
        <CategoryFilters
          categoryFilters={categoryFilters}
          categoryFilterSelected={categoryFilterSelected}
          categoryFilterClick={this.categoryFilterClick}
        />
        <br/>
        <span>price range: </span>
        <input
          style={styles.priceInput}
          placeholder="low" ref="priceFloor"
          value={priceFloor}
          onChange={this.handleInputChange}/>
        <span>to</span>
        <input
          style={styles.priceInput}
          placeholder="high" ref="priceCeiling"
          value={priceCeiling}
          onChange={this.handleInputChange}/>
        <hr/>
        {Notify}
        {ScrollToTopButton}
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
      </div>
    )
  }
}
