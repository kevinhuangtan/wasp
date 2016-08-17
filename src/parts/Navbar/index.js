import React, { Component } from 'react';

class Navbar extends Component {

  render() {
    var active1 = "";
    var active2 = "";
    switch (window.location.pathname){
      case "/":
        active1 = "active"
      break;
      case "/page1":
        active1 = "active"
      break;
      case "/page2":
        active2 = "active"
        break;
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <p>Celena Template</p>
            </a>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className={active1}><a href="/page1">Page1</a></li>
              <li className={active2}><a href="/page2">Page2</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
