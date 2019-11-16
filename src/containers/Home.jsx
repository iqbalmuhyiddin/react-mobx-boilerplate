import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Navbar from "containers/Navbar";
import Page from "containers/Page";
import NoMatch from "containers/NoMatch";
import PrivateRoute from "utils/PrivateRoute";

@withRouter
class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/page" component={Page} />
          <PrivateRoute path="/private-route" component={Page} />
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Home;
