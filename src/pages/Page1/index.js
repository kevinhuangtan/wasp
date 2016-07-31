import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';

import helpers from '../../helpers';


const styles = {
  name:{

  },
  timestamp: {
    opacity: .4
  }
}
class VisitorRow extends Component {
  static propTypes = {
     visitor: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    visitor: {
      name: 'kevin'
    }
  };

  handleDeleteVisitor = () => {
    var key = this.props.visitor['.key'];
    firebase.database().ref(`visitors/${key}`).remove();
  };

  render(){
    const { visitor } = this.props;

    return (
      <div onClick={this.handleDeleteVisitor}>
        <p style={styles.name}>{visitor.name}</p>
        <p style={styles.timestamp}>{helpers.getTimePassed(new Date(visitor.date))} ago</p>
      </div>
    )
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
      var ret = [];
      snap.forEach((child) => {
        var snapChild = child.val();
        snapChild['.key'] = child.key;
        ret.push(snapChild);
      })
      this.setState({ visitors : ret });
    });
  }

  handleAddVisitor = () => {
    var ref = firebase.database().ref('visitors');
    ref.push({
      name : this.refs.name.value,
      date : new Date().getTime()
    })
  };

  render() {

    const { visitors } = this.state;

    return (
      <div>
        <input type="text" ref="name"/><br/><br/>
        <button className="btn btn-primary"
          onClick={this.handleAddVisitor}>add user</button><br/><br/>
        <hr/>
        <h2>Visitors</h2>
        <p><i>data pulled from firebase</i></p>
        {visitors.map((visitor, i) => {
          return (
            <VisitorRow key={i} visitor={visitor}/>
          )
        })}
      </div>
    )
  }
}
