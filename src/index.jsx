import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import * as serviceWorker from "./serviceWorker";

import moment from "moment";
import "moment/locale/id";

import authStore from "stores/authStore";
import commonStore from "stores/commonStore";
import userStore from "stores/userStore";

const stores = {
  authStore,
  commonStore,
  userStore
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>{/*  */}</BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
