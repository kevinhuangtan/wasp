import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';

import helpers from '../../helpers';


class VisitorRow extends Component {
  static propTypes = {
     visitor: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    visitor: {
      name: 'kevin'
    }
  };

  render(){
    const { visitor } = this.props;
    return <p>{visitor.name}</p>
  }
}

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitors: [],
    };
  }

  componentDidMount(){
    var ref = firebase.database().ref('visitors');
    ref.on('value', (snap) => {
      if(snap.val()){
        this.setState({ visitors : helpers.objectToArray(snap.val())})
      }
    });
  }

  handleClick = () => {
    var ref = firebase.database().ref('visitors');
    ref.push({
      name : this.refs.name.value
    })
  };

  render() {
    return (
      <div>
        <input type="text" ref="name"/><br/><br/>
        <button className="btn btn-primary"
          onClick={this.handleClick}>add user</button><br/><br/>
        <hr/>
        <h2>Visitors</h2>
        <p><i>data pulled from firebase</i></p>
        {this.state.visitors.map((visitor, i) => {
          return (
            <VisitorRow key={i} visitor={visitor}/>
          )
        })}
      </div>
    )
  }
}
