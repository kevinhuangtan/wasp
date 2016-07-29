import React, { PropTypes, Component } from 'react';

const styles = {
    box:{
      backgroundColor: "rgb(230,230,230)",
      padding: 20,
      margin: 20,
      width: 500
    }
}

const testData = [
  {
    user : "kevin.tan@yale.edu",
    fileName : 'myPdfFile.pdf',
    data : 'adfbaieufbaiuebfiu',
    date : new Date()
  },
  {
    user : "peter.zhou@yale.edu",
    fileName : 'monthlyreport.pdf',
    data : '323ff2',
    date : new Date()
  }
]

class Page1 extends Component {
  componentDidMount(){

  }

  render(){

    return (
      <div>
        {testData.map((data) => {
          return (
            <div style={styles.box}>
              <p>{data.user}</p>
              <p>{data.fileName}</p>
              <p>{data.date.toString()}</p>
              <button className="btn btn-primary">Download</button>
            </div>
          )
        })}
      </div>
    )
  }
}

module.exports = Page1
