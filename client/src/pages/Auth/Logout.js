import Cookies from "js-cookie";
import axios from 'axios';
import {APP_URL, SERVER_URI} from "../../constants";

const Logout = async () => {
  try {
    await axios.get(SERVER_URI + '/logout');
    Cookies.remove('accessToken', { domain: '.' + APP_URL });
  } catch (error) {
    console.error(error);
  }
};

export default Logout;
