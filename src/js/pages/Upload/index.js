import React, { PropTypes, Component } from 'react';

import Dropzone from 'react-dropzone';

class DropzoneDemo extends Component{
    onDrop (files) {
      console.log('Received files: ', files);
    }

    render () {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
};

class Page2 extends Component {
  componentDidMount(){

  }

  render(){

    return (
      <div>
        <DropzoneDemo/>
      </div>
    )
  }
}

module.exports = Page2
