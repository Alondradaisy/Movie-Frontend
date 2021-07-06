import React, { Component } from "react"; //bring in react
import { Link, NavLink } from "react-router-dom"; // bring in Link and NavLink to display in DOM
import "./Nav.css"; //bring in nav css
export class Nav extends Component {
  render() {
    //console.log(this.props);

    //Nav bar text Movie with Friends as Link (like an <a href> tag)
    //Welcome back user with Sign up and Login NavLinks
    //inline styling and handling changes as they logout
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              {this.props.user ? (
                <NavLink activeClassName="selected" to="/profile">
                  Welcome Back - {this.props.user.email}
                </NavLink>
              ) : (
                <NavLink activeClassName="selected" to="/sign-up">
                  Sign up
                </NavLink>
              )}
            </li>
            <li>
              {this.props.user ? (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                  onClick={this.props.handleUserLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  activeStyle={{ borderBottom: "1px solid white" }}
                  to="/login"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav; //run Nav
