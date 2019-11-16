import React from "react";
import { observer, inject } from "mobx-react";
import { NavLink, withRouter } from "react-router-dom";
import { c } from "constant";

import Button from "@material-ui/core/Button";
import DisplayError from "components/DisplayError";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

@inject(c.STORE.AUTH)
@inject(c.STORE.COMMON)
@inject(c.STORE.USER)
@withRouter
@observer
class Register extends React.Component {
  state = {
    showPassword: false
  };

  _handleChange = event => {
    this.props.authStore.updateLoginData(event.target.name, event.target.value);
  };

  _handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  _onSubmit = e => {
    e.preventDefault();
    this.props.authStore.login().then(() => {
      return this.props.history.push(`/`);
    });
  };

  componentDidMount() {
    const { isLogin } = this.props.commonStore;
    this.props.authStore.resetLoginData();
    if (isLogin()) {
      return this.props.history.push(`/`);
    }
  }

  render() {
    const { errors, inProgress } = this.props.authStore;
    return (
      <div className="w-100 mvh-100 d-flex justify-content-center align-items-center p-3">
        <div className="container">
          <div className="row justify-content-center">
            <Paper className="p-4 p-sm-5 col-md-8 col-lg-6 col-12 text-center">
              <h3>Masuk</h3>
              {typeof errors !== "undefined" && <DisplayError error={errors} />}
              <form onSubmit={this._onSubmit}>
                <FormControl component="fieldset" className="w-100">
                  <TextField
                    id="identifier"
                    label="Email"
                    name="identifier"
                    onChange={this._handleChange}
                    required
                    fullWidth
                  />
                </FormControl>
                <FormControl component="fieldset" className="w-100 mt-3">
                  <InputLabel htmlFor="password">Password *</InputLabel>
                  <Input
                    id="password"
                    label="Password"
                    type={this.state.showPassword ? "text" : "password"}
                    name="password"
                    onChange={this._handleChange}
                    required
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this._handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  className="w-100 mt-3"
                  type="submit"
                  disabled={inProgress}
                >
                  Masuk
                </Button>
              </form>
            </Paper>
          </div>
          <div className="row justify-content-center">
            <p className="text-white mt-3">
              Belum punya akun?{" "}
              <NavLink to="/auth/register" className="text-white">
                <u>Daftar.</u>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
