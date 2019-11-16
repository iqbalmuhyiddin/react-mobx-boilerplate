import { observable, action, toJS, reaction } from "mobx";
import API from "../utils/API";

class UserStore {
  @observable
  inProgress = false;

  @observable
  isUserUpdating = false;

  @observable
  errors = undefined;

  @observable
  errorMessage = "";

  @observable
  file = undefined;

  @observable
  profile = {
    address: "",
    district: "",
    gender: "male",
    id: "",
    photo: null
  };

  userJSON = {
    id: "",
    phone_number: "",
    email: "",
    name: "",
    type: ""
  };

  @observable
  user = JSON.parse(
    window.localStorage.getItem("user") || JSON.stringify(this.userJSON)
  );

  constructor() {
    reaction(
      () => this.user,
      user => {
        if (user) {
          window.localStorage.setItem("user", JSON.stringify(user));
        } else {
          window.localStorage.removeItem("user");
        }
      }
    );
  }

  isAdmin = () => {
    return this.user.type === "admin";
  };

  @action
  updateProfileData = (key, value) => {
    this.profile[key] = value;
  };

  @action
  setFile = file => {
    this.file = file;
  };

  @action
  setUser(user) {
    this.user = user;
  }

  @action
  setError = error => {
    this.errors = error;
  };

  @action
  updateUser = (name, value) => {
    this.editUser[name] = value;
  };

  hasUserUpdateProfile = () => {
    return this.profile.address !== null && this.profile.address !== "";
  };

  @action
  getUser() {
    this.inProgress = true;
    return API.User.get().then(({ data }) => {
      this.user = data;
      this.editUser.name = data.name;
      this.editUser.username = data.username;
      this.editUser.institution = data.institution;
      this.editUser.email = data.email;
      this.inProgress = false;
    });
  }

  @action
  setProfile = data => {
    this.profile = data;
  };

  @action
  getProfile() {
    this.isUserUpdating = true;

    return API.User.get()
      .then(({ data }) => {
        if (data !== null) {
          this.setProfile(data);
        }
        this.errors = undefined;
      })
      .catch(({ data }) => {
        this.errors = data.message;
        throw data;
      })
      .finally(() => {
        this.isUserUpdating = false;
      });
  }

  @action
  updateProfile() {
    this.isUserUpdating = true;

    return API.User.update(this.profile)
      .then(({ data }) => {
        this.profile = data;
        this.errors = undefined;
      })
      .catch(({ data }) => {
        this.errors = data.message;
        throw data;
      })
      .finally(() => {
        this.isUserUpdating = false;
      });
  }
}

export default new UserStore();
