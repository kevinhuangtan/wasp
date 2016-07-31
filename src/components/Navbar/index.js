import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    var activeHome = "";
    var activePage1 = "";
    switch (window.location.pathname){
      case "/":
        activeHome = "active"
      break;
      case "/page1":
        activePage1 = "active"
        break;
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <p>Demo App</p>
            </a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className={activeHome}><a href="/">Home</a></li>
              <li className={activePage1}><a href="/page1">Page 1</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
