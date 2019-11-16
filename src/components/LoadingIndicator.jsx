import * as React from "react";
import { Spinner } from "reactstrap";

function LoadingIndicator({ isLoading, size }) {
  return (
    <div className={`text-center ${!isLoading && "d-none"}`}>
      <Spinner
        style={{ width: size, height: size }}
        type="grow"
        color="primary"
      />
    </div>
  );
}

LoadingIndicator.defaultProps = {
  isLoading: true,
  size: 50
};

export default LoadingIndicator;
