import React from "react";
import { c } from "constant";
import { inject, observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import Snackbar from "components/Snackbar";

import Home from "containers/Home";
import Login from "containers/Login";
import NoMatch from "containers/NoMatch";
import Register from "containers/Register";

@inject(c.STORE.COMMON)
@observer
class App extends React.Component {
  render() {
    const { snackbarOption, closeSnackbar } = this.props.commonStore;
    const { isOpen, message, type } = snackbarOption;
    return (
      <React.Fragment>
        <Snackbar
          isOpen={isOpen}
          message={message}
          type={type}
          onClose={closeSnackbar}
        />
        <div className="bg-primary vw-100 mvh-100">
          <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/register" component={Register} />
            <Route path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
