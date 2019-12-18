import * as React from "react";
import { Spin } from "antd";

function LoadingIndicator({ isLoading, size }) {
  return (
    <div className={`text-center ${!isLoading && "d-none"}`}>
      <Spin size={size} />
    </div>
  );
}

LoadingIndicator.defaultProps = {
  isLoading: true,
  size: 50
};

export default LoadingIndicator;
