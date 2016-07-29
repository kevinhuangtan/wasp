import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    var activeUpload = "";
    var activePDFs = "";
    switch (window.location.pathname){
      case "/":
        activeUpload = "active"
      break;
      case "/pdfs":
        activePDFs = "active"
        break;
      case "/upload":
        activeUpload = "active"
        break;
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <p>Alirt Research</p>
            </a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className={activePDFs}><a href="/pdfs">PDFS</a></li>
              <li className={activeUpload}><a href="/upload">Upload</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
