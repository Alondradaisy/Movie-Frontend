import React from "react"; //brings in react into proj
import { BrowserRouter as Router, Route } from "react-router-dom"; //instantiates router-dom

import Signup from "./components/Signup/Signup"; //Signup file path
import Login from "./components/Login/Login"; //Login file path
import Home from "./components/Home/Home"; //Home file path
import Nav from "./components/Nav/Nav"; //Nav file path
import Movie from "./components/Movie/Movie"; //Movie file path
import MovieDetail from "./components/Movie/MovieDetail"; //MovieDetail file path
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"; //PrivateRoute file path

//mainRouter func
const MainRouter = (props) => {
  return (
    <Router>
      <Nav user={props.user} handleUserLogout={props.handleUserLogout} />
      <>
        {/* <Route exact path="/movie" component={Movie} /> */}
        <PrivateRoute exact path="/movie" component={Movie} />
        <Route exact path="/sign-up" component={Signup} />
        {/* <Route exact path="/login" component={Login}>
          <Login handleUserLogin={props.handleUserLogin} />
        </Route> */}

        <Route
          exact
          path="/login"
          render={(routerProps) => (
            <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
          )}
        />
        {/* /api/user/user-detail/get-user-by-id/:id */}
        {/* <Route exact path="/movie-detail/:movieTitle" component={MovieDetail} /> */}
        <PrivateRoute
          exact
          path="/movie-detail/:movieTitle"
          component={MovieDetail}
        />
        <Route exact path="/" component={Home} />
      </>
    </Router>
  );
};

export default MainRouter; //runs the mainRouter
