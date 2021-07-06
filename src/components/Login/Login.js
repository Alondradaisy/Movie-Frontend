import React, { Component } from "react"; //brings in react component
import { isEmpty, isEmail } from "validator"; //authenticates these two with validator
import jwtDecode from "jwt-decode"; //brings in jwt-decode to decode web tokens

import { toast } from "react-toastify"; //imports toastify for toast notifications
import Axios from "../utils/Axios"; //brings in Axios - also npm i axios via terminal
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; //instantiates this func from this path

import "./Login.css"; //brings in login styling sheet
//brings in login check fields
export class Login extends Component {
  state = {
    email: "",
    emailError: "",
    emailOnFocus: false,
    password: "",
    passwordError: "",
    passwordOnFocus: false,
    canSubmit: true,
  };

  componentDidMount() {
    let isAuth = checkIfUserIsAuth(); //variable assigned to check if user is authorized

    if (isAuth) {
      //if user is authorized
      this.props.history.push("/movie"); //push user props to /movie path
    }
  }

  //updates on change of event
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value, //is the target's name (input value) equal to the target's value? | do values match?
      },
      () => {
        if (event.target.name === "email") {
          //checks if the field is equal to input email
          if (isEmpty(this.state.email)) {
            // checks if the email field is empty
            this.setState({
              //update the state and tell user the email field cannot be empty
              emailError: "Email cannot be empty",
              canSubmit: true,
            });
          } else {
            //otherwise
            this.setState({
              emailError: "",
            });
          }
        }

        if (event.target.name === "password") {
          // is the target name equal to input password?
          if (isEmpty(this.state.password)) {
            //is the field empty?
            this.setState({
              //update the state and tell user the field cannot be empty
              passwordError: "Password cannot be empty",
              canSubmit: true,
            });
          } else {
            this.setState({
              passwordError: "",
            });
          }
        }
      }
    );
  };

  //updates when state changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.canSubmit === true) {
      //allow user to submit if...
      if (this.state.emailOnFocus && this.state.passwordOnFocus) {
        //if both emailOnFocus and passwordOnFocus are there
        if (
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 // if there are no email or password errors
        ) {
          this.setState({
            canSubmit: false,
          });
        } else {
          this.setState({
            canSubmit: true,
          });
        }
      }
    }
  }

  //handles the input that is focused in on
  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault(); //prevents a browser refresh/reload

    try {
      let result = await Axios.post("/api/user/login", {
        //creates an axios call through this path
        email: this.state.email, //email set to this.state.email
        password: this.state.password, //password set to this.state.password
      });

      let jwtToken = result.data.payload; //assigns jwtToken to the results data payload

      console.log(jwtToken); //logs the jwtToken in the console
      let decodedToken = jwtDecode(jwtToken); //assigns a variable that can decode the jwt Token
      console.log(decodedToken); //logs it out in the console

      this.props.handleUserLogin(decodedToken); //decodes the token for user login

      window.localStorage.setItem("jwtToken", jwtToken); //stores the jwtToken in local storage with private key
      toast.success("Login success!"); //toast success notification - imported from Toastify

      this.props.history.push("/movie");
    } catch (e) {
      //if there are any errs, catch them
      if (e.response.status === 429) {
        //if err found, send a 429 err status
        toast.error(e.response.data); // toast err response
      } else {
        toast.error(e.response.data.payload); //send a toast error response
      }
    }
  };

  //initializes a dynamic react app to render components
  render() {
    const { email, emailError, password, passwordError, canSubmit } =
      this.state;

    //console.log(this.props);

    return (
      <div className="container">
        <div className="form-text">Login</div> // {/* creates a login area*/}
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label> //{" "}
                {/* creates an email area*/}
                <input
                  type="email"
                  id="email"
                  placeholder="Email" // placeholder text for email input field
                  name="email"
                  value={email}
                  onChange={this.handleOnChange} // {/* when there is a change made to the field, run the handleOnChange func*/}
                  onFocus={this.handleInputOnFocus} // {/*when there is a change to what is auto-focused in, run the handleInputOnFocus func*/}
                  autoFocus //autofocus on field
                />
                <div className="errorMessage">{emailError && emailError}</div>{" "}
                //{/* displays if there is an error in email/format*/}
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label> //{" "}
                {/* creates a password area*/}
                <input
                  type="text"
                  id="password"
                  placeholder="Password" //{/* placeholder text for password input*/}
                  name="password"
                  value={password}
                  onFocus={this.handleInputOnFocus} // {/*when there is a change to what is auto-focused in, run the handleInputOnFocus func*/}
                  autoFocus //autofocus on field
                  onChange={this.handleOnChange} // {/* when there is a change made to the field, run the handleOnChange func*/}
                />
                <div className="errorMessage">
                  {passwordError && passwordError} //{" "}
                  {/* displays if there is an error in email/format*/}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={canSubmit}>
                {" "}
                //{/* creates a submit button for form*/}
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login; //runs Login
