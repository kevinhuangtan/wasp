import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

// import { WithContext as ReactTags } from 'react-tag-input';

import ReactTags from 'react-tag-autocomplete';

class TagsContainer extends Component {

    state = {
      suggestions : [],
    }
    static propTypes = {
      tags: PropTypes.object.isRequired,
      setTagsSelected: PropTypes.func.isRequired,
    }

    componentWillReceiveProps(nextProps){
      this.setState({ suggestions : Object.keys(nextProps.tags)})
    }
    handleDelete = (i) => {
        let tagsSelected = Object.assign([], this.props.tagsSelected); // important!!
        tagsSelected.splice(i, 1);
        this.props.setTagsSelected(tagsSelected);
    }
    handleAddition = (tag) => {
      tag = tag.name.toLowerCase();
      let tagsSelected = Object.assign([], this.props.tagsSelected);
      tagsSelected.push(tag);
      this.props.setTagsSelected(tagsSelected);
    }
    transform = (tags) => {
      var ret = []
      tags.map((tag, i) => {
        ret.push({
          id : i,
          name : tag
        })
      })
      return ret
    }
    render() {
        const { suggestions } = this.state;
        const { tagsSelected } = this.props;
        var tagsSelectedTransform = this.transform(tagsSelected);
        var suggestionsTransform = this.transform(suggestions);
        return (
            <div
              style={{
                fontSize: 14,
                marginTop: 10,
                textAlign: 'left',
                minWidth: 200
              }}>
              <ReactTags
                tags={tagsSelectedTransform}
                suggestions={suggestionsTransform}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                minQueryLength={1}
                placeholder={`add tags`}
              />
            </div>
        )
    }
}


export default class Tags extends Component {
  static propTypes = {
    tags: PropTypes.object.isRequired,
    tagsSelected: PropTypes.array.isRequired,
    setTagsSelected: PropTypes.func.isRequired,
  }

  componentDidMount(){
    var refTags = firebase.database().ref('tags');
    refTags.once('value', (snap) => {
      var tags = snap.val();
      var tagsKeys = Object.keys(tags);
      tagsKeys.forEach((tag) => {
        if(Object.keys(tags[tag]).length < 10){
          delete tags[tag]
        }
      })
      this.props.fetchUpdate(tags)
    });

  }
  render(){
    const { tags, tagsSelected, setTagsSelected } = this.props;
    return(
      <TagsContainer
        setTagsSelected={setTagsSelected}
        tagsSelected={tagsSelected}
        tags={tags}/>
    )
  }
}
