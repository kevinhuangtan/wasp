import React, { PropTypes, Component } from 'react';
import Styles from '../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const margin = 7;

const storeFilter = {
  backgroundColor: '#E7E7E7',
  boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
  borderWidth: 0,
  display: 'inline-block',
  color: '#737373',
  opacity: .7,
  whiteSpace: 'nowrap',
  padding: 5,
  paddingLeft: 10,
  paddingRight:10,
  paddingTop: 7,
  borderRadius: 0,
  margin: 2,
  marginBottom: 10

}

const styles = {
  container: {
    // display: 'flex',
    alignItems:'flex-end',
    overflowX: mobile ? 'scroll' : 'none',
    whiteSpace: mobile ? 'nowrap' : 'inherit',
    fontSize: Styles.small,

  },

  storeFilter:{
    ...storeFilter
  },
  storeFilterSelected:{
    ...storeFilter,
    backgroundColor: Styles.colorMain,
    color: 'white',
  },
}

class StoreFilter extends Component {

  handleClick = () => {
    this.props.onStoreClick(this.props.store);
  };

  render(){
    const { store, storeMap, storesSelected, total } = this.props;
    const storeName = storeMap[store];

    // var text = `${storeName} ${total}`;
    var text = `${storeName}`;

    if(storesSelected.indexOf(store) == -1){
      return (
        <button className="hover-opacity-reverse" onClick={this.handleClick} style={styles.storeFilter} onClick={this.handleClick}>{text}</button>
      )
    }
    return (
      <button onClick={this.handleClick} style={styles.storeFilterSelected} onClick={this.handleClick}>{text}</button>
    )
  }
}

export default class Container extends Component {
  handleClickAll = () => {
    this.props.selectAll();
  }
  render(){
    const {storesSelected, storeTotals, storeKeys, storeMap, onStoreClick} = this.props;
    return (

      <div style={styles.container}>
        <button
          className="hover-opacity-light"
          onClick={this.handleClickAll}
          style={{
            ...styles.storeFilter,
            textTransform: 'uppercase'
          }}>
            <b>select all </b>
          </button>

        {storeKeys.map((store, i) => {
          return (
            <StoreFilter
              key={i}
              store={store}
              storeMap={storeMap}
              storesSelected={storesSelected}
              total={storeTotals[store]}
              onStoreClick={onStoreClick}/>
          )
        })}
      </div>
    )
  }
}
