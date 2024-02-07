import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@material-ui/core/TextField';
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const drawerWidth =100;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: 'auto',
    marginBottom: 40
  },
  userInfo: {
    textAlign: 'left',
    paddingLeft: theme.spacing(3),
  },
  editIcon: {
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  contentForm: {
    marginLeft: 20,
  },
  avatarForm: {
    marginLeft: drawerWidth,
  },
  formEdit: {
    marginLeft: drawerWidth,
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  menuLists: {
    width: 328,
    padding: 12
  }
}));


const Cabinet = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const notify = () => toast("Wow so easy!");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsEditing(false); // Reset isEditing when switching tabs
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const defaultTheme = createTheme();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <List className={classes.menuLists}>
            <ListItem button onClick={() => handleTabClick('profile')} style={{ height: 64 , width: 328,}} >
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Профіль"/>
            </ListItem>
            <ListItem button onClick={() => handleTabClick('edit')}  style={{ height: 64 , width: 328}} >
              <ListItemIcon>
                <EditIcon/>
              </ListItemIcon>
              <ListItemText primary="Редагувати профіль"/>
            </ListItem>
            <ListItem button onClick={() => handleTabClick('history')}  style={{ height: 64 , width: 328}}>
              <ListItemIcon>
                <HistoryIcon/>
              </ListItemIcon>
              <ListItemText primary="Історія"/>
            </ListItem>
            <ListItem button onClick={() => handleTabClick('bookmarks')}  style={{ height: 64 , width: 328}} >
              <ListItemIcon>
                <BookmarksIcon/>
              </ListItemIcon>
              <ListItemText primary="Збереженні"/>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={8}>
          {activeTab === 'edit' ? (
            <Paper className={classes.paper}>
              <form>
                {/* Edit profile fields */}
                <TextField
                  label="Ім'я"
                  variant="outlined"
                  className={classes.input}
                />
                <TextField
                  label="Прізвище"
                  variant="outlined"
                  className={classes.input}
                />
                <TextField
                  label="Емейл"
                  variant="outlined"
                  className={classes.input}
                />
                <TextField
                  label="Телефон"
                  variant="outlined"
                  className={classes.input}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon/>}
                  className={classes.editIcon}
                  onClick={handleEditClick}
                >
                  Зберегти зміни
                </Button>
              </form>
            </Paper>
          ) : activeTab === 'history' ? (
            <Paper className={classes.paper}>
              <Typography variant="h5">Історія дій</Typography>
              {/* Add content for history tab */}
            </Paper>
          ) : activeTab === 'bookmarks' ? (
            <Paper className={classes.paper}>
              <Typography variant="h5">Збереженні</Typography>
              {/* Add content for bookmarks tab */}
            </Paper>
          ) : (
            <Fragment>
              <Grid container spacing={3}>
              <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Avatar alt="Profile Photo" src="https://picsum.photos/300" className={classes.avatar}/>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon/>}
                  className={classes.editIcon}
                  onClick={handleEditClick}
                >
                  Додати фото
                </Button>
              </Paper>
              </Grid>
              <Grid item xs={8}>
              <Paper className={classes.paper}>
                <div className={classes.userInfo}>
                  {/* Display user information */}
                  <Typography variant="h4">Ім'я Користувача</Typography>
                  <Typography variant="subtitle1">Емейл: user@example.com</Typography>
                  <Typography variant="subtitle1">Дата реєстрації: 01/01/2022</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon/>}
                    className={classes.editIcon}
                    onClick={handleEditClick}
                    onClick={notify}
                  >
                    Редагувати профіль
                  </Button>
                  <div>
                    <Button onClick={notify}>Notify!</Button>
                    <ToastContainer/>
                  </div>
                </div>
              </Paper>
              </Grid>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Cabinet;
