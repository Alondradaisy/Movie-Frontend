import jwtDecode from "jwt-decode"; //import JWT Decode to token

//checks if user is authorized with jwt token
const checkIfUserIsAuth = () => {
  //check if token exists, if it doesnt exists return false
  //if it does exists, check if token valid (meaning not expired)
  //if expired return false
  //else return true

  let getJwtToken = window.localStorage.getItem("jwtToken"); //store jwtToken in local storage

  if (getJwtToken) {
    const currentTime = Date.now() / 1000;
    let decodedToken = jwtDecode(getJwtToken);

    if (decodedToken.exp < currentTime) {
      // think of this logically - time wise
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export default checkIfUserIsAuth; //run the func
