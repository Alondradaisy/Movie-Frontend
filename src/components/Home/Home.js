import React, { Component } from "react"; //brings in react

export class Home extends Component {
  //renders the styled div for homepage
  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: 75 }}>
        Welcome to Coolest APP
      </div>
    );
  }
}

export default Home; //run Home
