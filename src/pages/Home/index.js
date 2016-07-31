import React, { PropTypes, Component } from 'react';
import Navbar from '../../components/Navbar';
import Page1 from '../Page1';


////////////////////////////////////////////////
//////////////////*~ Styles ~*//////////////////
////////////////////////////////////////////////

const styles = {
  container: {
    marginTop: 50, // navbar height
    padding: 20,
  }
}

////////////////////////////////////////////////
////////////////*~ Component ~*/////////////////
////////////////////////////////////////////////

class Home extends Component {
  componentDidMount(){

  }

  render(){
    var Page;
    switch (window.location.pathname){
      case "/":
        Page = <h1>Home</h1>
      break;
      case "/page1":
        Page = <Page1/>
        break;
    }

    return (

      <div className="container" style={styles.container}>
        <Navbar/>
        {Page}
      </div>
    )
  }
}

module.exports = Home
