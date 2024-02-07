import {USER_KEY} from 'constants'
import storage from 'utils/storage'
import Room from "../../components/Room/Room";
import NameInput from "../../components/NameInput/NameInput";
import {Fragment} from "react";
import {get} from "../../api/axios.api";
import authService from "../../services/authService";

export default function Home() {
  const user = storage.get(USER_KEY)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await get('/protected');
    console.log('Received data:', data);
  };

  return (user ?
      <Fragment>
        <Room/>
        <button onClick={handleSubmit}>Submit</button>

        {authService.isUserLoggedIn() ? (
         <Fragment>
           залогінений можна шось показати
         </Fragment>
        ) : (
          <>
           Гость
          </>
        )}
      </Fragment>
      :
      <NameInput/>
  )
}
