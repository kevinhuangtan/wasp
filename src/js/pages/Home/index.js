import React, { PropTypes, Component } from 'react';
import Navbar from '../../components/Navbar';
import Pdfs from '../Pdfs';
import Upload from '../Upload';

import Dropzone from 'react-dropzone';

class DropzoneDemo extends Component{
  onDrop (file) {
    console.log('Received files: ', file);
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
    var Page;

    switch (window.location.pathname){
      case "/":
        Page = <Upload/>
      break;
      case "/pdfs":
        Page = <Pdfs/>
        break;
      case "/upload":
        Page = <Upload/>
        break;
    }


    return (

      <div>
        <Navbar/>
        {Page}
      </div>
    )
  }
}

module.exports = Home
