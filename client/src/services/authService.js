import Cookies from "js-cookie";
import axios from "axios";
import {ACCESS_TOKEN, SERVER_URI} from "../constants";

const authService = {
  isUserLoggedIn: () => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    return !!accessToken;
  },
  isAdmin: () => {
    const userRole = localStorage.getItem('userRole');
    return userRole.toLowerCase() === 'admin';
  },

  loginUser: async (formData) => {
    try {
      const response = await axios.post(SERVER_URI + '/login', formData, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data)
      if (response.data.code === 401) {
        console.log(response.data.message)
      } else {
        localStorage.setItem('user', response.data.user);
      }
      return response.data;

    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  logoutUser: async () => {
    try {
      const response = await axios.post(SERVER_URI + '/logout');
      console.log(response.data)
    } catch (error) {
      console.log(error)
      throw error;
    }
  },

  registerUser: async (formData) => {
    try {
      const response = await axios.post(SERVER_URI + '/register', formData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
};

export default authService;
