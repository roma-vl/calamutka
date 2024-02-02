import Cookies from "js-cookie";
import axios from "axios";
import {ACCESS_TOKEN, SERVER_URI} from "../constants";

const authService = {
  isUserLoggedIn: () => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    return !!accessToken;
  },
  isAdmin: () => {
    // Ваша логіка перевірки ролі адміністратора
    const userRole = localStorage.getItem('userRole');
    return userRole.toLowerCase() === 'admin';
  },

  loginUser: async (formData) => {
    try {
      const response = await axios.post(SERVER_URI + '/login', formData, {
        withCredentials: true,
      });
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
      const response = await axios.post(SERVER_URI + '/logout', {
        withCredentials: true,
      });
      console.log(response.data)
      // localStorage.setItem('userRole', response.data.user.role);
      // return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },

  registerUser: async (formData) => {
    try {
      const response = await axios.post(SERVER_URI + '/register', formData,{
        withCredentials: true,
      });
      console.log(response.data)
      // localStorage.setItem('userRole', response.data.user.role);
      // return response.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
};

export default authService;
