import Container from "@mui/material/Container";
import {Fragment} from "react";
import Room from "../../components/Room/Room";
import authService from "../../services/authService";
import NameInput from "../../components/NameInput/NameInput";
import storage from "../../utils/storage";
import {USER_KEY} from "constants";
import {get} from "../../api/axios.api";
const CabinetMessage = () => {
  const user = storage.get(USER_KEY)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await get('/protected');
    console.log('Received data:', data);
  };
  return (
    <Container component="main">
      {(user ?
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
      )}
    </Container>
  )


}

export default CabinetMessage
