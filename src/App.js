import React, { Component } from "react"; // brings in react to the project frontend
import { ToastContainer } from "react-toastify"; //brings in toastify for notifications
import jwtDecode from "jwt-decode"; // brings in jwtDecode for jwt token

import MainRouter from "./MainRouter"; //instantiates mainRouter and its path
import setAxiosAuthToken from "./components/utils/setAxiosAuthToken";

import "./App.css"; // brings in the styling sheet for app

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken");

    if (getJwtToken) {
      const currentTime = Date.now() / 1000; //current time of use

      let decodedJWTToken = jwtDecode(getJwtToken);

      if (decodedJWTToken.exp < currentTime) {
        //if the expiration time is less than current time
        //logout
        this.handleUserLogout(); //log user out
      } else {
        //login
        this.handleUserLogin(decodedJWTToken);
      }

      // console.log("currentTime", currentTime);
      // June XXXX xxpm- 1624985322
      // ONE DAY FROM June XXXX xxpm - 1625071722
      // Current Time - 163500000
      // console.log("decodedJWTToken", decodedJWTToken);
    }
  }
  //handleUserLogin info
  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email,
      },
    });
  };

  //handle user logout info and remote the private token they used to access and update the state
  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken");
    setAxiosAuthToken(null);
    this.setState({
      user: null,
    });
  };

  //initializes a dynamic app to render components
  //toastify styles the position of notification(s)
  render() {
    return (
      <>
        <ToastContainer position="top-center" />

        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout}
        />
      </>
    );
  }
}

export default App;
