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

class Home extends Component {
  componentDidMount(){

  }

  render(){

    return (
      <div>
        <DropzoneDemo/>
        <input type="file" accept="application/pdf" />
      </div>
    )
  }
}

module.exports = Home
