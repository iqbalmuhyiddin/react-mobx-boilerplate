import { notification } from "antd";

const openNotification = ({ message, title, type }) => {
  return notification[type]({
    message: title || "",
    description: message
  });
};

export default openNotification;
