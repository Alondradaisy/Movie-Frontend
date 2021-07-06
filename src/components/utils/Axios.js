import axios from "axios"; //instantiates axios | download / npm i axios via terminal

const Axios = axios.create({
  //create an API req
  baseURL:
    process.env.NODE_ENV === "development" //global variable that refers to where app is being hosted
      ? "http://localhost:8080" //path in local dev environment
      : "deploy CLOUD ADDRESS", // where app will be hosted
  timeout: 50000, //timer for running react axios call
});

export default Axios; //run Axios
