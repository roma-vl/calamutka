
import { USER_KEY } from 'constants'
import storage from 'utils/storage'
import Room from "../../components/Room/Room";
import NameInput from "../../components/NameInput/NameInput";
import {createTheme} from "@mui/material/styles";
const defaultTheme = createTheme();
export default  function Home ()  {
    const user = storage.get(USER_KEY)

    return (user ? <Room /> : <NameInput />);
}
