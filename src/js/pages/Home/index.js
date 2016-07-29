import React, { PropTypes, Component } from 'react';

class Home extends Component {
  componentDidMount(){

  }

  render(){

    return (
      <div>
        <h1>Home</h1>
        <p><a href="/page1">page 1</a></p>
        <p><a href="/page2">page 2</a></p>
      </div>
    )
  }
}

module.exports = Home
