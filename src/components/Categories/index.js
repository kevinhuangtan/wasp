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

const CategoriesKeys =
  [
    'all',
    'sweaters',
    'loungewear',
    'hoodies',
    'jackets',
    'shirts',
    'denim',
    'cardigans',
    'pants',
    'tees',
    'polos',
    'sweatpants',
    'basics',
    'vintage'
  ];


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


const Categories  = ({ categorySelected, onCategoryClick } ) => {

    return (
      <div>
        {CategoriesKeys.map((category, i) => {
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
