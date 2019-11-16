import { observable, action, toJS, reaction } from "mobx";
import API from "utils/API";

class commonStore {
  @observable
  inProgress = false;

  @observable
  isUploading = false;

  @observable
  isError = false;

  @observable
  errorMessage = "";

  @observable
  snackbarOption = {
    isOpen: false,
    type: "success",
    message: ""
  };

  @observable
  token = window.localStorage.getItem("token");

  @action
  openSnackbar = (message, type = "success") => {
    this.snackbarOption = {
      isOpen: true,
      type,
      message
    };
  };

  @action
  closeSnackbar = () => {
    this.snackbarOption = {
      isOpen: false,
      type: "success",
      message: ""
    };
  };

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem("token", token);
        } else {
          window.localStorage.removeItem("token");
        }
      }
    );
  }

  consoleLog(value, name = "Log mobx data:") {
    console.log(name, toJS(value));
  }

  @action
  setToken = token => {
    this.token = token;
  };

  @action
  logout() {
    this.token = undefined;
  }

  @action
  setError(isError, message = "") {
    this.isError = isError;
    this.errorMessage = message;
  }

  @action
  uploadFile = file => {
    this.isUploading = true;
    let payload = new FormData();
    payload.append("file", file);
    return API.Common.upload(payload).finally(() => {
      this.isUploading = false;
    });
  };

  getToken() {
    return this.token;
  }

  isLogin = () => {
    if (typeof this.token === "undefined") {
      return false;
    }
    if (this.token) {
      return true;
    } else {
      return false;
    }
  };
}

export default new commonStore();
