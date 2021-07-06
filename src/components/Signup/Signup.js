import React, { Component } from "react"; //brings in react
import jwtDecode from "jwt-decode"; //brings in jwt decode to jwt web token
import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator"; //imports validators to check auth with validator (post npm i validator)
import { toast } from "react-toastify"; //brings in toast for notifications
import Axios from "../utils/Axios"; //brings in axios and direct file path
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; //brings in func to check if user is auth
import "./Signup.css"; //brings in the css file for signup

//signup
export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    isButtonDisabled: true,
    firstNameOnFocus: false,
    lastNameOnFocus: false,
    emailOnFocus: false,
    usernameOnFocus: false,
    passwordOnFocus: false,
    confirmPasswordOnFocus: false,
  };

  componentDidMount() {
    let isAuth = checkIfUserIsAuth();

    if (isAuth) {
      this.props.history.push("/movie");
    }
  }

  //checks to make sure that user input matches fields
  handleOnChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        if (
          //values are matched by first and last name
          event.target.name === "firstName" ||
          event.target.name === "lastName"
        ) {
          this.handleFirstNameAndLastNameInput(event);
        }
        //values are matched by email
        if (event.target.name === "email") {
          this.handleEmailInput();
          //handles the user input
        }
        // values are matched by username
        if (event.target.name === "username") {
          this.handleUsernameInput();
          //handles the user input
        }
        // values are matched with password
        if (event.target.name === "password") {
          this.handlePasswordInput();
          //handles the user input
        }
        //checks that passwords match for auth
        if (event.target.name === "confirmPassword") {
          this.handleConfirmPasswordInput();
          //handles the user input
        }
      }
    );
  };

  //makes sure that passwords match
  handleConfirmPasswordInput = () => {
    if (this.state.password !== this.state.confirmPassword) {
      //if they don't match, send err msg
      this.setState({
        confirmPasswordError: "Password does not match!", // err msg for user
        isButtonDisabled: true, //disables submit button
      });
    } else {
      //if they do match
      this.setState({
        //set State update
        confirmPasswordError: "", //no error
      });
    }
  };

  //handles user input for password
  handlePasswordInput = () => {
    if (this.state.confirmPasswordOnFocus) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          confirmPasswordError: "Password does not match",
          isButtonDisabled: true,
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }

    if (this.state.password.length === 0) {
      //checks to make sure that field is not left empty
      this.setState({
        //if it is left empty, alert user and disable the submit form button
        passwordError: "Password cannot be empty",
        isButtonDisabled: true,
      });
    } else {
      //checks for password strength
      if (isStrongPassword(this.state.password)) {
        this.setState({
          passwordError: "",
        });
      } else {
        // if password is not strong enough, tell user what needs it needs to contain
        this.setState({
          passwordError:
            "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
          isButtonDisabled: true, //while user fixes it, disable submit button
        });
      }
    }
  };

  //handles email user input
  handleEmailInput = () => {
    if (this.state.email.length === 0) {
      // makes sure that field is not left empty - must contain characters
      this.setState({
        emailError: "Email cannot be empty", // if it's empty, tell user cannot be empty
        isButtonDisabled: true, // disable button
      });
    } else {
      if (isEmail(this.state.email)) {
        this.setState({
          emailError: "",
        });
      } else {
        this.setState({
          //if invalid format, tell user to input a valid email following format
          emailError: "Please, enter a valid email!",
          isButtonDisabled: true,
        });
      }
    }
  };

  handleFirstNameAndLastNameInput = (event) => {
    if (this.state[event.target.name].length > 0) {
      //checks the field length is not empty
      if (isAlpha(this.state[event.target.name])) {
        //checks for alphabet letters
        this.setState({
          [`${event.target.name}Error`]: "",
        });
      } else {
        this.setState({
          [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`, //if input has other characters, let user know 'can only have alphabet'
          isButtonDisabled: true, //disabled until fixed
        });
      }
    } else {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`, //tell user if field remains empty
        isButtonDisabled: true,
      });
    }
  };

  handleUsernameInput = () => {
    if (this.state.username.length === 0) {
      //checks to see if input field is empty
      this.setState({
        usernameError: "Username cannot be empty", //if empty alert user to not leave empty
        isButtonDisabled: true, //disable button
      });
    } else {
      if (isAlphanumeric(this.state.username)) {
        //checks if username is alphanumerical with validator
        this.setState({
          usernameError: "", // it is
        });
      } else {
        this.setState({
          usernameError: "Username can only have alphabet and number", //if not tell user this
          isButtonDisabled: true,
        });
      }
    }
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      let userInputObj = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };
      let success = await Axios.post("/api/user/sign-up", userInputObj);
      console.log(success);
      toast.success(`${success.data.message}`);
    } catch (e) {
      toast.error(`${e.response.data.message}`);
    }
  };

  handleOnBlur = (event) => {
    // console.log(event.target.name);
    // console.log("handle onBlur Triggered");

    if (this.state[event.target.name].length === 0) {
      this.setState({
        [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.isButtonDisabled);

    if (prevState.isButtonDisabled === true) {
      if (
        this.state.firstNameOnFocus &&
        this.state.lastNameOnFocus &&
        this.state.emailOnFocus &&
        this.state.usernameOnFocus &&
        this.state.passwordOnFocus &&
        this.state.confirmPasswordOnFocus
      ) {
        if (
          this.state.firstNameError.length === 0 &&
          this.state.lastNameError.length === 0 &&
          this.state.usernameError.length === 0 &&
          this.state.emailError.length === 0 &&
          this.state.passwordError.length === 0 &&
          this.state.confirmPasswordError.length === 0 &&
          this.state.password === this.state.confirmPassword
        ) {
          this.setState({
            isButtonDisabled: false,
          });
        }
      }
    }
  }

  handleInputOnFocus = (event) => {
    if (!this.state[`${event.target.name}OnFocus`]) {
      this.setState({
        [`${event.target.name}OnFocus`]: true,
      });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      usernameError,
      emailError,
      passwordError,
      confirmPasswordError,
    } = this.state;

    console.log(this.props);

    return (
      <div className="container">
        <div className="form-text">Sign up</div> //signup form
        <div className="form-div">
          <form className="form" onSubmit={this.handleOnSubmit}>
            <div className="form-group-inline">
              <div className="inline-container">
                <label htmlFor="firstName">First Name</label> //area for first
                name
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  placeholder="First Name" //placeholder for first name input field
                  name="firstName"
                  onChange={this.handleOnChange} //handles changes to field
                  autoFocus
                  onBlur={this.handleOnBlur} //out of focus
                  onFocus={this.handleInputOnFocus} // in focus
                />
                <div className="errorMessage">
                  {firstNameError && firstNameError} //displays if there's an
                  err in firstName
                </div>
              </div>

              <div className="inline-container">
                <label htmlFor="lastName">Last Name</label> //last name area
                field
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleOnChange}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {lastNameError && lastNameError} //displays if there's an
                  error in lastName
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="email">Email</label> //area for email field
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleOnChange}
                  name="email"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">{emailError && emailError}</div>{" "}
                //displays if there's in err in email
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="username">Username</label> //area for username
                field
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.handleOnChange}
                  name="username"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {usernameError && usernameError} //displays if there's an err
                  in username
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="password">Password</label> //area for password
                field
                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleOnChange}
                  name="password"
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleInputOnFocus}
                />
                <div className="errorMessage">
                  {passwordError && passwordError} //displays if there's an err
                  in password
                </div>
              </div>
            </div>

            <div className="form-group-block">
              <div className="block-container">
                <label htmlFor="confirmPassword">Confirm Password</label> //area
                for confirm password field
                <input
                  type="text"
                  id="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password" //placeholder for input field
                  onChange={this.handleOnChange} //handles when there's been a change
                  name="confirmPassword"
                  onBlur={this.handleOnBlur} // out of focus
                  onFocus={this.handleInputOnFocus} //in focus
                />
                <div className="errorMessage">
                  {confirmPasswordError && confirmPasswordError}
                </div>
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={this.state.isButtonDisabled}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup; //run signup
