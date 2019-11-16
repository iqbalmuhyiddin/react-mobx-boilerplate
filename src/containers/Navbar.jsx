import React from "react";
import { c } from "constant";
import { inject, observer } from "mobx-react";
import { NavLink } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

@inject(c.STORE.COMMON)
@observer
class NavbarApp extends React.Component {
  _handleLogout = () => {
    this.props.commonStore.logout();
  };
  render() {
    const { isLogin } = this.props.commonStore;
    return (
      <Navbar
        className="navbar d-flex justify-content-between navbar-shadow px-4"
        color="light"
        light
      >
        <div className="d-flex align-items-center">
          <NavbarBrand>App Name</NavbarBrand>
        </div>

        <Nav navbar className="d-flex flex-row">
          {isLogin() && (
            <UncontrolledDropdown nav className="d-inline-block ml-2">
              <DropdownToggle nav>
                <AccountCircle />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={NavLink} to="/profile">
                  Profil
                </DropdownItem>
                <DropdownItem onClick={this._handleLogout}>Keluar</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {!isLogin() && (
            <React.Fragment>
              <NavItem className="mr-3">
                <NavLink to="/auth/login">Masuk</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auth/register">Daftar</NavLink>
              </NavItem>
            </React.Fragment>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default NavbarApp;
