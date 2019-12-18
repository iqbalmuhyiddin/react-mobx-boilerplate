import React from "react";
import { Alert } from "antd";

const DisplayError = ({ error }) => {
  return <Alert type="error" message={error} />;
};

export default DisplayError;
