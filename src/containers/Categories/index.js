import { connect } from 'react-redux'
import { toggleCategory } from '../../redux/actions'
import Categories from '../../components/Categories'

const CategoriesKeys =
  [
    'all',
    'sweaters',
    // 'loungewear',
    'hoodies',
    'jackets',
    'shirts',
    'denim',
    // 'cardigans',
    'pants',
    'tees',
    'polos',
    'sweatpants',
    'joggers',
    // 'basics',
    // 'vintage'
  ];



const mapStateToProps = (state) => {
  return {
    categorySelected: state.categorySelected,
    categoriesKeys: CategoriesKeys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryClick: (category) => {
      dispatch(toggleCategory(category))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default Container
