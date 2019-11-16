import React, { Component } from "react";
import { c } from "constant";
import { Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject(c.STORE.COMMON)
@inject(c.STORE.USER)
@observer
class AdminRoute extends Component {
  render() {
    const { commonStore, userStore, ...props } = this.props;

    if (commonStore.isLogin() && userStore.isAdmin()) {
      return <Route {...props} />;
    }

    return <Redirect to="/" />;
  }
}

export default AdminRoute;
