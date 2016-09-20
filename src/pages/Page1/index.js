import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import helpers from '../../helpers';
import InfiniteScroll from 'react-infinite-scroller'

const styles = {
  storeFilterSelected:{
    backgroundColor: '#575D7E',
    boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
    borderRadius: '8px',
    borderWidth: '0',
    marginBottom: 10,
    display: 'inline-block',
    color: 'white',
    marginRight: 10,
  },
  storeFilter:{
    backgroundColor: '#E7E7E7',
    boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
    borderRadius: '8px',
    borderWidth: '0',
    marginBottom: 10,
    display: 'inline-block',
    color: '#737373',
    marginRight: 10,
  },
  name:{
  },
  productImage:{
    height: 300,
    cursor: 'pointer'
  },
  timestamp: {
    opacity: .4
  }
}

class StoreFilter extends Component {

  handleClick = () => {
    this.props.storeFilterClick(this.props.store);
  };

  render(){
    const { store, storeFilters, storeFiltersSelected } = this.props;

    if(storeFiltersSelected.indexOf(store) == -1){
      return (
        <button onClick={this.handleClick} style={styles.storeFilter} onClick={this.handleClick}>{store}</button>
      )
    }
    return (
      <button onClick={this.handleClick} style={styles.storeFilterSelected} onClick={this.handleClick}>{store}</button>
    )

  }
}



class StoreFilters extends Component {

  handleClick = () => {
    this.props.storeFilterClick(this.props.store);
  };

  render(){
    const { storeFilters, storeFiltersSelected, storeFilterClick } = this.props;

    return (
      <div style={{position: 'fixed', right: 0, display: 'flex', flexDirection:'column', alignItems:'flex-end', padding: 20}}>
        <p style={{opacity:.7, marginRight: 10}}><u>sources</u></p>
        {storeFilters.map((store, i) => {
          return (
            <StoreFilter
              key={i}
              store={store}
              storeFilters={storeFilters}
              storeFiltersSelected={storeFiltersSelected}
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
        <button onClick={this.handleClick} style={styles.storeFilter} onClick={this.handleClick}>{category}</button>
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

  goToProduct = (url) => {
    window.open(url, '_blank');
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
          className="hover-opacity"
          style={{cursor:'pointer'}}
          onClick={() => this.goToProduct(product.url)}><u>{product.name}</u></p>
        <p>${product.price.toFixed(2)} from <b>{product.store}</b></p>
      </div>
    )

  }
}

function loadFunc(){
  console.log('load more')
}


export default class Home extends Component {

  state = {
    storeFilters : ['uo', 'asos', 'topman'],
    storeFiltersSelected: ['asos'],
    categoryFilters : ['sweaters', 'loungewear', 'hoodies', 'outerwear', 'shirts', 'jeans', 'cardigans'],
    categoryFilterSelected: "hoodies",
    allProducts : [],
    page : 0
  };

  componentDidMount(){

    var ref = firebase.database().ref('stores');
    ref.on('value', (snap) => {
      var ret = [];
      snap.forEach((child) => {
        var snapChild = child.val();
        snapChild['.key'] = child.key;
        ret.push(snapChild);
      })
      this.setProducts(ret);
    });
  }

  setProducts = (ret) => {
    var productsRet = [];
    for(var i=0; i<ret.length; i++){
      var products = ret[i].products;
      for(var j=0; j<products.length; j++){
        if(products[j].price){
          productsRet.push({
            store: ret[i]['.key'],
            name: products[j].name[0].text,
            price: parseFloat(products[j].price[0].text.replace(/\$/g, '')),
            url: products[j].name[0].href,
            img: products[j].image[0].src,
            category: products[j].category
          })
        }
      }
    }
    this.setState({ allProducts: productsRet });
  }


  filterByStore = (product) => {
    var storeFiltersSelected = this.state.storeFiltersSelected;

    if(storeFiltersSelected.indexOf(product.store) == -1){
      return false
    }
    return true
  }

  filterByCategory = (product) => {
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
    this.setState({ storeFiltersSelected : storeFiltersSelected });
  }

  categoryFilterClick = (category) => {
    this.setState({
      categoryFilterSelected : category,
      page: 0
    });
  }

  loadMore = (p) => {
    this.setState({ page : p });
  }

  filterProducts = () => {
    var allProducts = this.state.allProducts;
    var ret = [];
    allProducts.forEach((product, i) => {
      if(!this.filterByStore(product)){
        return
      }
      if(!this.filterByCategory(product)){
        return
      }
      ret.push(product);
    });
    return ret
  }

  sortBy(products){
    return products.sort((a,b)=>{
      return a.price - b.price
    })
  }


  render() {

    const { page, storeFilters, storeFiltersSelected, categoryFilters, categoryFilterSelected, allProducts } = this.state;

    var Products = this.filterProducts();
    Products = this.sortBy(Products);

    var hasMore = true;
    if((page+1)*20 > Products.length){
      hasMore = false;
    }
    var ProductsSlice = Products.slice(0, (page + 1) * 20);

    var ProductList;
    if(ProductsSlice.length != 0){
      ProductList =
        ProductsSlice.map((product, i) => {
          return (
            <Product product={product} key={i}/>
          )
        })
    }

    return (
      <div>
        <h1>Walt Steve Picasso</h1>
        <p>WaSP scrapes the latest menswear products from a bunch of places</p>
        <hr/>
        <StoreFilters
          storeFilters={storeFilters}
          storeFiltersSelected={storeFiltersSelected}
          storeFilterClick={this.storeFilterClick}
        />
        <CategoryFilters
          categoryFilters={categoryFilters}
          categoryFilterSelected={categoryFilterSelected}
          categoryFilterClick={this.categoryFilterClick}
        />
      <br/>
        <p>sort by price: low to high</p>
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
