import React from "react"; //brings in react
import ReactDOM from "react-dom"; //instantiates the react-dom

import "react-toastify/dist/ReactToastify.css"; //brings in toastify for animated notifications

import App from "./App"; //instantiates app and its path

import "./_base.css"; // brings in base css
import "./index.css"; // brings in index css
console.log(process.env.NODE_ENV); //displays the node environment

// enables DOM to read content inside react app | how it will render
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// without root, the react app will not render | root encapsulates code in container- like mode
