import React, { PropTypes, Component } from 'react';

import Dropzone from 'react-dropzone';

const styles = {
  dropzone: {
    padding: 20
  }
}

class DropzoneDemo extends Component{
    constructor(){
      super();
      this.onDrop = this.onDrop.bind(this);
    }
    onDrop (files) {
      console.log('Received files: ', files);
      this.props.uploadedFile();
    }

    render () {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div style={styles.dropzone}>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
};

class Page2 extends Component {
  constructor(){
    super();
    this.state = {
      showButton: false
    }
    this.uploadedFile = this.uploadedFile.bind(this);
  }
  componentDidMount(){

  }
  uploadedFile(){
    this.setState({ showButton : true });
  }

  render(){
    var Button;
    if(this.state.showButton){
      Button = <button className="btn">Upload PDF</button>
    }
    return (
      <div>
        <DropzoneDemo uploadedFile={this.uploadedFile}/>
        <br/>
        {Button}
      </div>
    )
  }
}

module.exports = Page2
