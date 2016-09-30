import React, { PropTypes, Component } from 'react';
import Styles from '../styles';
import ProgressSteps from 'react-progress-steps';

import Stores from '../containers/Stores';
import Tags from '../containers/Tags';
import FBLogin from '../components/FBLogin';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const styles = {
  step_container:{
    height: mobile? 180 : 150,
    padding: mobile ? 20 : 0,
    paddingTop: mobile ? 0 : 0,
    display: 'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    paddingBottom: 30,
  }
}


class Step_3 extends Component {
  static propTypes = {
    setStep: PropTypes.func.isRequired
  }

  handleSkip = (e) =>{
    e.preventDefault()
  }
  render(){
    var Button;
    if(this.props.tagsSelected.length > 0){
      Button = <button onClick={() => this.props.setStep(4)}>finish <span style={{fontSize:20}}>🎆</span></button>
    }

    return (
      <div>
        <div style={styles.step_container}>
          <p>add one or more tags to narrow down</p>
            <p style={{
                opacity: 1,
                marginBottom:0,
                fontSize: Styles.small,
                fontStyle: 'italic',
                marginLeft: 20
              }}>ex: shirts, sweaters, plaid, denim, sweaters, joggers</p>
          <Tags/>
        </div>
        {Button}
      </div>
    )
  }
}

class Step_2 extends Component {
  static propTypes = {
    setStep: PropTypes.func.isRequired
  }

  handleSkip = (e) =>{
    e.preventDefault()
  }
  componentDidMount(){
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.props.setStep(3)
      }
    });
  }
  render(){

    return (
      <div>
        <div style={styles.step_container}>
          <p>login to save products for later</p>
          <div style={{
              width: mobile ? 200 : 'auto',
              margin: mobile ? '0 auto' : 'auto'
            }}>
            <FBLogin/>
          </div>
        </div>
        <button onClick={() => this.props.setStep(3)}>skip</button>
      </div>
    )
  }
}

class Step_1 extends Component {
  static propTypes = {
    setStep: PropTypes.func.isRequired
  }
  render(){
    var Button;
    if(this.props.storesSelected.length > 0){
      Button = <button onClick={() => this.props.setStep(2)}>next</button>
    }
    return (
      <div>
        <div style={styles.step_container}>
          <p>select one or more stores you want products from</p>
          <br/>
          <div>
            <Stores/>
          </div>
        </div>
        {Button}
      </div>
    )
  }
}

class Step_0 extends Component {
  static propTypes = {
    setStep: PropTypes.func.isRequired
  }

  render(){
    return (
      <div>
        <div style={styles.step_container}>
          <p>{"You don't need a million tabs open to find exactly what you're looking for..."}</p>
          <p>WaSP is a free platform that lets you search and compare products in one place.</p>
        </div>
        <button onClick={() => this.props.setStep(1)}>start <span style={{fontSize:20}}>🏁</span></button><br/><br/>
      </div>
    )
  }
}


function setStep(step, setStep, storesSelected, tagsSelected){
  switch (step){
    case 0:
      return <Step_0 setStep={setStep}/>
    case 1:
      return <Step_1 setStep={setStep} storesSelected={storesSelected}/>
    case 2:
      return <Step_2 setStep={setStep}/>
    case 3:
      return <Step_3 setStep={setStep} tagsSelected={tagsSelected}/>

    default:
      return null
  }
}

export default class Onboard extends Component {

  state = {
    step : 0,
  };

  setStep = (step) =>{
    this.setState({ step : step })
    if(step == 4){
      this.props.setView("SEARCH"); // finish onboarding
    }
  }

  static propTypes = {
  }

  render(){
    const { step } = this.state;
    const { storesSelected, tagsSelected } = this.props;
    let Step = setStep(step, this.setStep, storesSelected, tagsSelected);
    return (
      <div
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginTop: 20,
          display: mobile ? 'block' : 'flex',
          overflow: mobile ? 'auto' : 'hidden'
        }}>
        <div
          style={{
            opacity: step == 0 ? 0 : 1,
            margin: '0 auto',
            width: 270,
            marginBottom: 50
          }}>
          <ProgressSteps steps={3} current={step} />
        </div>
        <br/ >
        {Step}
      </div>
    )
  }
}
