import React, { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Styles from '../../styles';

class Component1 extends Component {
  constructor(){
    super();
    this.state =  {
      order: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log('click');
  }
  render(){

    return (
      <Paper zDepth={1}>
        <p>Component 1</p>
      </Paper>
    )
  }
}

const styles = {
}

module.exports = Component1
