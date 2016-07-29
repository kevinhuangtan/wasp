import React, { PropTypes, Component } from 'react';

import Navbar from '../../components/Navbar';
import Pdfs from '../Pdfs';
import Upload from '../Upload';


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
