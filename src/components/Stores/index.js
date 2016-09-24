import React, { PropTypes, Component } from 'react';
import Styles from '../../styles';

const styles = {
  storeFilterSelected:{
    backgroundColor: Styles.colorMain,
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
}

class StoreFilter extends Component {

  handleClick = () => {
    this.props.onStoreClick(this.props.store);
  };

  render(){
    const { store, storeMap, storesSelected, total } = this.props;
    const storeName = storeMap[store];

    var text = `${storeName} (${total})`

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

const Stores = ({ storesSelected, storeTotals, storeKeys, storeMap, onStoreClick }) => {

  return (
    <div style={{position: 'fixed', right: 0, display: 'flex', flexDirection:'column', alignItems:'flex-end', padding: 20}}>
      <p style={{opacity:.7, marginRight: 10}}><u>select sources</u></p>
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

export default Stores
