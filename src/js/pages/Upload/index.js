import React, { PropTypes, Component } from 'react';

import Dropzone from 'react-dropzone';
import firebase from 'firebase';

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
      var storageRef = firebase.storage().ref();
      // Upload the file to the path 'images/rivers.jpg'
      // We can use the 'name' property on the File API to get our file name
      var uploadTask = storageRef.child('pdf/' + files[0].name).put(files[0]);
      console.log("i sent the file");
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
      }, function(error) {
        console.log("error" + error);
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
      });
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
