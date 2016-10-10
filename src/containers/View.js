import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { receiveProducts, setView } from '../redux/actions'

import Saved from '../containers/Saved';
import Search from '../containers/Search';
import Bag from '../containers/Bag';
import Onboard from '../containers/Onboard';
import Match from '../containers/Match';


// subscribe to store's state
const mapStateToProps = (state) => {
  return {
    view: state.view
  }
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view) => {
      dispatch(setView(view))
    }
  }
}

function showView(view){
  switch (view){
    case 'ONBOARD':
      return <Onboard/>
      break;
    case 'SEARCH':
      return  <Search/>
      break;
    case 'BAG':
      return <Saved/>
      break;
    case 'MATCH':
      return <Match/>
      break;
    default:
      return <Search/>
  }
}

class View extends Component {
  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
    });
  }
  render(){
    const { view } = this.props;
    let View = showView(view);
    return View
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default Container
