import React, { PropTypes, Component } from 'react';

import Dropzone from 'react-dropzone';
//Set up firebase
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyD7uebkapR_L7MApC-zpdZAdwt8aMsiT8Q",
  authDomain: "alirt-ab979.firebaseapp.com",
  databaseURL: "https://alirt-ab979.firebaseio.com",
  storageBucket: "alirt-ab979.appspot.com",
};
firebase.initializeApp(config);


class DropzoneDemo extends Component{
  onDrop (file) {
    console.log('Received files: ', file);
    var storageRef = firebase.storage().ref();
    // Upload the file to the path 'images/rivers.jpg'
    // We can use the 'name' property on the File API to get our file name
    var uploadTask = storageRef.child('pdf/' + file[0].name).put(file[0]);
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
