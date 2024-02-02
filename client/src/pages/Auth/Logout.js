import Cookies from "js-cookie";
import axios from 'axios';
import { SERVER_URI } from "../../constants";

const Logout = async () => {
  try {
    await axios.get(SERVER_URI + '/logout');
    Cookies.remove('accessToken', { domain: '.calamutka.com' });
  } catch (error) {
    console.error(error);
  }
};

export default Logout;
