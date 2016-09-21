import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import helpers from '../../helpers';
import InfiniteScroll from 'react-infinite-scroller';
var storeKeys = [  'asos', 'topman', 'uo', 'uniqlo', 'hm', 'jcrew', 'forever21'];


const styles = {
  storeFilterSelected:{
    backgroundColor: '#575D7E',
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


export default class Home extends Component {

  state = {
    storeFilters : storeKeys, // HACK:
    storeFiltersSelected: [],
    categoryFilters : ['all', 'sweaters', 'loungewear', 'hoodies', 'jackets', 'shirts', 'denim', 'cardigans', 'pants', 'tees', 'polos', 'sweatpants', 'basics','vintage' ],
    categoryFilterSelected: "all",
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
        if(products[j].price && products[j].name && products[j].image && products[j].category){
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
    if(storeFiltersSelected == 'all'){
      return true
    }
    if(storeFiltersSelected.indexOf(product.store) == -1){
      return false
    }
    return true
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

  loadMore = (p) => {
    this.setState({ page : p });
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

  sortBy(products){
    return products.sort((a,b)=>{
      return a.price - b.price
    })
  }


  render() {

    const { page, storeFilters, storeFiltersSelected, categoryFilters, categoryFilterSelected, allProducts } = this.state;

    var productsFilteredByCategory = this.filterProductsByCategory(allProducts);
    var products = this.filterProductsByStore(productsFilteredByCategory)
    products = this.sortBy(products);

    var hasMore = true;
    if((page+1)*20 > products.length){
      hasMore = false;
    }
    var productsSlice = products.slice(0, (page + 1) * 15);

    var ProductList;
    if(productsSlice.length != 0){
      ProductList =  productsSlice.map((product, i) => {
          return (
            <Product product={product} key={i}/>
          )
        })
    }
    var Notify;
    if(storeFiltersSelected.length == 0){
      Notify = <h3 style={{float:'right'}}>start by selecting a source --------></h3>
    }
    return (
      <div style={{padding : 40, marginTop: 70, marginRight: 200}}>
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
        <p>sort by price: low to high</p>
        <hr/>
        {Notify}
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
