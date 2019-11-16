import request from "./request";

const useAuth = true;
const withHeader = true;

const Auth = {
  register: data =>
    request(
      {
        url: "public/register",
        method: "POST",
        data
      },
      useAuth
    ),
  login: data =>
    request(
      {
        url: "public/login",
        method: "POST",
        data
      },
      useAuth
    )
};

const Others = {
  downloadTicket: invoice_id =>
    request(
      {
        url: `/private/event/download-ticket/${invoice_id}`,
        method: "GET",
        responseType: "blob"
      },
      useAuth,
      withHeader
    )
};

export default {
  Auth,
  Others
};
