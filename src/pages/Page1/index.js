import React, { PropTypes, Component } from 'react';

import firebase from 'firebase';
import helpers from '../../helpers';


const styles = {
  visitorContainer:{
    marginTop: 20,
    padding: 20,
    width: 400,
    backgroundColor: 'rgb(245,245,245)'
  },
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
      <div style={styles.visitorContainer}>
        <p style={styles.name}>{visitor.name}</p>
        <p style={styles.timestamp}>{helpers.getTimePassed(new Date(visitor.date))} ago</p>
        <button onClick={this.handleDeleteVisitor}>delete</button>
      </div>
    )
  }
}

export default class VisitorsPage extends Component {

  state = {
    visitors: [],
  };

  componentDidMount(){

    // this is how you reference data from firebase
    var ref = firebase.database().ref('visitors');
    ref.on('value', (snap) => {
      var ret = [];
      snap.forEach((child) => {
        var snapChild = child.val();

        // manually add key as a child
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
        <input placeholder="name" type="text" ref="name"/><br/><br/>
        <button onClick={this.handleAddVisitor}>add user</button><br/><br/>
        <hr/>
        <h2>Visitors</h2>
        <p><i>data pulled from <a target="_blank"
          href="https://console.firebase.google.com/project/simple-react-firebase-app/database/data">firebase project</a></i></p>
        {visitors.map((visitor, i) => {
          return (
            <VisitorRow key={i} visitor={visitor}/>
          )
        })}
      </div>
    )
  }
}
