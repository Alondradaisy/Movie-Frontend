import React from "react"; //brings in react
import { Route, Redirect } from "react-router-dom"; // instantiates Route and Redirect for page login
import checkIfUserIsAuth from "../utils/checkIfUserIsAuth"; //brings in file path to check if user is authorized

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routerProps) =>
        checkIfUserIsAuth() ? (
          <Component {...routerProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute; //run it to check user authorization
// const PrivateRoute = (props) => {
//   console.log(props);

//   return <Route exact path={props.path} component={props.component} />;
// };

// const PrivateRoute = (props) => {
//   console.log(props);

//   return (
//     <Route
//       exact
//       path={props.path}
//       render={() => <Movie />}
//       render={() => (props.user ? props.component : <Redirect to="/login" />)}
//     />
//   );
// };
