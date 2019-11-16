import { observable, action } from "mobx";
import API from "../utils/API";
import commonStore from "./commonStore";
import userStore from "./userStore";

export class AuthStore {
  @observable
  inProgress = false;

  @observable
  errors = undefined;

  @observable
  loginData = {
    identifier: "",
    password: ""
  };

  @observable
  registerData = {
    phone_number: "",
    name: "",
    email: "",
    password: ""
  };

  @action
  setError = error => {
    this.errors = error;
  };

  @action
  resetLoginData() {
    this.loginData = {
      identifier: "",
      password: ""
    };
    this.errors = undefined;
    this.inProgress = false;
  }

  @action
  resetRegisterData() {
    this.registerData = {
      phone_number: "",
      name: "",
      email: "",
      password: ""
    };
    this.errors = undefined;
    this.inProgress = false;
  }

  @action
  updateLoginData = (key, value) => {
    this.loginData[key] = value;
  };

  @action
  updateRegisterData = (key, value) => {
    this.registerData[key] = value;
  };

  @action
  register = () => {
    this.inProgress = true;

    return API.Auth.register(this.registerData)
      .then(({ data }) => {
        commonStore.setToken(data.token);
        userStore.setUser(data.user);
        this.errors = undefined;
      })
      .catch(({ data }) => {
        this.errors = data.message || data.data;
        throw data;
      })
      .finally(() => {
        this.inProgress = false;
      });
  };

  @action
  login = () => {
    this.inProgress = true;
    return API.Auth.login(this.loginData)
      .then(({ data }) => {
        commonStore.setToken(data.token);
        userStore.setUser(data.user);
        this.errors = undefined;
      })
      .catch(({ data }) => {
        this.errors = data.message;
        throw data;
      })
      .finally(() => {
        this.inProgress = false;
      });
  };

  logout = () => {
    commonStore.setToken(undefined);
  };
}

export default new AuthStore();
