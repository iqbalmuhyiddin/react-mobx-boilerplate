import React from "react";
import { Alert } from "reactstrap";

const DisplayError = ({ error }) => {
  return <Alert color="danger">{error}</Alert>;
};

export default DisplayError;
