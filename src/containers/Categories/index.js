import { connect } from 'react-redux'
import { toggleCategory } from '../../redux/actions'
import Categories from '../../components/Categories'

const mapStateToProps = (state) => {
  return {
    categorySelected: state.categorySelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryClick: (category) => {
      console.log('dispatch: ', category)
      dispatch(toggleCategory(category))
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default Container
