
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'routes/app.routes'
import { useDispatch} from 'react-redux';
import {useEffect} from "react";
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess} from "./userActions";
import {get} from "./api/axios.api";
import authService from "./services/authService";
  const App = () =>  {
    const dispatch = useDispatch();
    useEffect(() => {
      if (authService.isUserLoggedIn()) {
        const fetchUser = async () => {
          dispatch(fetchUserRequest());
          try {
            const response = await get('/auth/user');
            console.log(response)
            dispatch(fetchUserSuccess(response.data.user));
          } catch (error) {
            dispatch(fetchUserFailure(error.message));
          }
        };
        fetchUser()
      }
    }, [dispatch]);

    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    )
  }

export default App;

