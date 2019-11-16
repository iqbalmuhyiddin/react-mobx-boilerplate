import React from "react";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

const DisplayDate = ({ date, format }) => {
  return <span>{moment(date).format(format)}</span>;
};

DisplayDate.defaultProps = {
  format: "D MMM YYYY"
};
export default DisplayDate;
