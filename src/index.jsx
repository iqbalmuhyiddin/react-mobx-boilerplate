import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/id";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

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
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale="id"
          libInstance={moment}
        >
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
