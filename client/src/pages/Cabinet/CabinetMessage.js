import Container from "@mui/material/Container";
import Room from "../../components/Room/Room";
// import {get} from "../../api/axios.api";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@mui/material";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
  },
}));
const CabinetMessage = () => {
  const user = useSelector(state => state.user.userData);
  const classes = useStyles();
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = await get('/protected');
  //   console.log('Received data:', data);
  // };
  return (
    <Container component="main">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5">Повідомлення</Typography>
          {user && <Room user={user}/>}
        </Paper>
      </div>
    </Container>
  )


}

export default CabinetMessage
