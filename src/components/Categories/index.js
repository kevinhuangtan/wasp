import React, { PropTypes, Component } from 'react';
import Styles from '../../styles';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const margin = 7;

const styles = {
  container: {
    alignItems:'flex-end',
    overflowX: mobile ? 'scroll' : 'none',
    whiteSpace: mobile ? 'nowrap' : 'inherit'
  },
  storeFilterSelected:{
    backgroundColor: Styles.colorMain,
    boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
    borderRadius: '8px',
    borderWidth: '0',
    margin: margin,
    display: 'inline-block',
    color: 'white',
  },
  storeFilter:{
    backgroundColor: '#E7E7E7',
    boxShadow: '0px 2px 4px 0px rgba(180,180,180,0.50)',
    borderRadius: '8px',
    borderWidth: '0',
    margin: margin,
    display: 'inline-block',
    color: '#737373',
    opacity: .7

  },
}

class CategoryFilter extends Component {

  handleClick = () => {
    this.props.onCategoryClick(this.props.category);
  };

  render(){
    const { category, categorySelected } = this.props;
    if(category != categorySelected){
      return (
        <button className="hover-opacity-reverse" onClick={this.handleClick} style={styles.storeFilter} onClick={this.handleClick}>{category}</button>
      )
    }
    return (
      <button onClick={this.handleClick} style={styles.storeFilterSelected} onClick={this.handleClick}>{category}</button>
    )

  }
}


const Categories  = ({ categorySelected, categoriesKeys, onCategoryClick } ) => {

    return (
      <div style={styles.container}>
        {categoriesKeys.map((category, i) => {
          return (
            <CategoryFilter
              key={i}
              category={category}
              categorySelected={categorySelected}
              onCategoryClick={onCategoryClick}/>
          )
        })}
      </div>
    )

}


// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Categories
