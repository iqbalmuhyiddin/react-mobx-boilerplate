import React from "react";
import { c } from "constant";
import { observer, inject } from "mobx-react";
import { NavLink, withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import DisplayError from "components/DisplayError";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
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
    this.props.authStore.updateRegisterData(
      event.target.name,
      event.target.value
    );
  };

  _handleChangeProfile = event => {
    this.props.userStore.updateProfileData(
      event.target.name,
      event.target.value
    );
  };

  _handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  _onSubmit = e => {
    e.preventDefault();

    const params = new URLSearchParams(this.props.location.search);
    const redirect = params.get("redirect");

    this.props.authStore.register().then(() => {
      if (redirect) {
        this.props.history.push(`${redirect}/buy_ticket`);
        return;
      }
      this.props.history.push(`/`);
    });
  };

  UNSAFE_componentWillMount() {
    const { isAdmin } = this.props.userStore;
    const { isLogin } = this.props.commonStore;
    this.props.authStore.resetRegisterData();
    if (isLogin()) {
      if (isAdmin()) {
        return this.props.history.push(`/admin`);
      }
      return this.props.history.push(`/`);
    }
  }

  render() {
    const { errors, inProgress } = this.props.authStore;
    const { isUserUpdating } = this.props.userStore;
    return (
      <div className="w-100 mvh-100 d-flex justify-content-center align-items-center p-3">
        <div className="container">
          <div className="row justify-content-center">
            <Paper className="p-4 p-sm-5 col-md-8 col-lg-6 col-12 text-center">
              <h3>Buat Akun Baru</h3>
              {typeof errors !== "undefined" && <DisplayError error={errors} />}
              <form onSubmit={this._onSubmit}>
                <FormControl component="fieldset" className="w-100 mb-3">
                  <TextField
                    id="name"
                    label="Nama Lengkap"
                    name="name"
                    // value={email}
                    onChange={this._handleChange}
                    required
                    fullWidth
                  />
                </FormControl>
                <FormControl component="fieldset" className="w-100 mb-3">
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    onChange={this._handleChange}
                    required
                    fullWidth
                  />
                  <FormHelperText>
                    Gunakan email aktif, untuk menerima pemberitahuan.
                  </FormHelperText>
                </FormControl>
                <FormControl component="fieldset" className="w-100 mb-3">
                  <TextField
                    id="phone_number"
                    label="Nomor Telepon"
                    name="phone_number"
                    onChange={this._handleChange}
                    required
                    fullWidth
                  />
                </FormControl>

                <FormControl component="fieldset" className="w-100 mb-3">
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
                  disabled={inProgress || isUserUpdating}
                >
                  Buat Akun
                </Button>
              </form>
            </Paper>
          </div>
          <div className="row justify-content-center">
            <p className="text-white mt-3">
              Sudah punya akun?{" "}
              <NavLink to="/auth/login" className="text-white">
                <u>Masuk.</u>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
