import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { receiveProducts } from '../redux/actions'

// subscribe to store's state
const mapStateToProps = (state) => {
  return {}
}

// create handler than dispatches an action
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpdate: (products) => {
      dispatch(receiveProducts(products))
    }
  }
}

class FetchComponent extends Component {
  componentDidMount(){
    var refProducts = firebase.database().ref('products');
    refProducts.limitToFirst(10000).once('value', (snap) => {
      this.props.fetchUpdate(snap.val())
    });
  }
  render(){
    return null
  }
}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchComponent)

export default Container
