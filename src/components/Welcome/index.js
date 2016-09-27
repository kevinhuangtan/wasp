import React, { PropTypes, Component } from 'react';

var MobileDetect = require('mobile-detect');
var mobile = new MobileDetect(window.navigator.userAgent).mobile();

const styles = {
  welcomeText:{
    width: mobile ? "90%" : 620
  },
}

class Slide2 extends Component {
  render(){
    return(
      <div style={styles.welcomeText}>
        <p>start by selecting one or more stores above <span style={{fontSize : 40}}>☝️🏾</span>🏾</p>
      </div>
    )
  }
}

export default class Welcome extends Component {
  state = {
    slide : 0
  }
  render(){
    const { storesSelected } = this.props;
    var isStores = storesSelected.length > 0;
    if(isStores){
      return null
    }
    const { slide } = this.state;
    if(slide == 1){
      return <Slide2/>
    }
    return(
      <p style={styles.welcomeText}>
        Welcome to WaSP!
        <br/><br/>I made <a target="_blank" href="https://www.youtube.com/watch?v=irCZAR5xQ5A&feature=youtu.be&t=2s">Walt Steve Picasso</a> because I got tired of having a million tabs open whenever I shop online.<br/>
        <br/>So I made this platform, which is free to use for everyone. WaSP lets you discover, compare and save the latest products across different stores.
        <br/><br/>I hope WaSP helps you upgrade your look <i className="em em-fire"></i><i className="em em-fire"></i>
        <br/><br/>Sincerely,<br/><a href="mailto:hello@kevintan.me?body=Hey! My name is Kevin and I like music and making products for people :)">Kevin</a>
        {/*<br/><br/>Start by selecting one or more stores
        <span className="blinker"
          style={{
            display : mobile ? 'none' : 'block'
          }}>-->
        </span>*/}
        <br/><br/>
        <button onClick={() => this.setState ({ slide : 1})}>Start 🏁</button><br/><br/>
      </p>
    )

  }
}
