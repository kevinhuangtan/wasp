import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import Styles from '../styles';
var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

import { WithContext as ReactTags } from 'react-tag-input';

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
      let tagsSelected = Object.assign([], this.props.tagsSelected);
      tagsSelected.push(tag);
      this.props.setTagsSelected(tagsSelected);
    }
    handleDrag = (tag, currPos, newPos) => {
        // let tagsSelectedState = this.state.tagsSelectedState;
        //
        // // mutate array
        // tags.splice(currPos, 1);
        // tags.splice(newPos, 0, tag);
        //
        // // re-render
        // this.setState({ tagsSelectedState: tagsSelectedState });
    }
    transform = (tags) => {
      var ret = []
      tags.map((tag, i) => {
        ret.push({
          id : i,
          text : tag
        })
      })
      return ret
    }
    render() {
        const { suggestions } = this.state;
        const { tagsSelected } = this.props;
        var tagsSelectedTransform = this.transform(tagsSelected);
        console.log(suggestions)
        return (
            <div style={{marginTop: 20}}>
              <ReactTags
                tags={tagsSelectedTransform}
                suggestions={suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                minQueryLength={1}
                placeholder={`add tags/categories`}
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
