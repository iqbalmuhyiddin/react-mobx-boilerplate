import React, { Component } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

export default class SnackbarWrapper extends Component {
  static defaultProps = {
    vertical: "top",
    horizontal: "right",
    type: "success"
  };

  render() {
    const { vertical, horizontal, type, message, isOpen, onClose } = this.props;

    const iconStyle = {
      fontSize: 20,
      margin: "0 10px"
    };

    let Icon;
    let color;

    if (type === "error") {
      Icon = <ErrorIcon style={iconStyle} />;
      color = "danger";
    } else if (type === "success") {
      Icon = <CheckCircleIcon style={iconStyle} />;
      color = "success";
    } else if (type === "warning") {
      Icon = <WarningIcon style={iconStyle} />;
      color = "warning";
    } else if (type === "info") {
      Icon = <InfoIcon style={iconStyle} />;
      color = "info";
    }

    return (
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal
        }}
        open={isOpen}
        onClose={onClose}
        autoHideDuration={9000}
        className="m-5"
        variant
      >
        <SnackbarContent
          className={`bg-${color}`}
          aria-describedby="client-snackbar"
          message={
            <span
              id="client-snackbar"
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              {Icon}
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}
