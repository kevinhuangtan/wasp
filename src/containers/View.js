import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { receiveProducts, setView } from '../redux/actions'

import Saved from '../containers/Saved';
import Search from '../containers/Search';
import Bag from '../containers/Bag';
import Onboard from '../containers/Onboard';


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
    case 'SEARCH':
      return  <Search/>
    case 'BAG':
      return <Saved/>
    default:
      return <Search/>
  }
}

class View extends Component {
  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.props.setView("SEARCH");
      }
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
