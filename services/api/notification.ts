import { baseUrl, getAuthToken } from "./config";
import axios from "axios";

const url = `${baseUrl}/user/notifications`;

const readAllNotifications = async () => {
  const token = await getAuthToken();

  const resp = await axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data.message;
};

export { readAllNotifications };
