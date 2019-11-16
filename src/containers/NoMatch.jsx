import React from "react";
import { NavLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

class NoMatch extends React.Component {
  render() {
    return (
      <div className="w-100 mvh-100 d-flex p-3">
        <div className="container">
          <Paper className="text-center p-5">
            <h1>404</h1>
            <p>Halaman tidak ditemukan</p>
            <p>
              <NavLink to="/">Kembali ke halaman utama</NavLink>
            </p>
          </Paper>
        </div>
      </div>
    );
  }
}

export default NoMatch;
