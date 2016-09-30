import { connect } from 'react-redux'
import { setTags, setTagsSelected } from '../redux/actions'
import Tags from  '../components/Tags'

const mapStateToProps = (state) => {
  return {
    tags: state.tags.tags,
    tagsSelected: state.tags.tagsSelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdate: (tags) => {
      dispatch(setTags(tags))
    },
    setTagsSelected: (tagsSelected) => {
      dispatch(setTagsSelected(tagsSelected));
    }
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags)

export default Container
