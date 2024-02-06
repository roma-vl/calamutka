import React, {Fragment, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
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
  menuList: {
    width: 360,
    paddingLeft: 60
  }
}));

const HomeForm = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsEditing(false); // Reset isEditing when switching tabs
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={classes.root}>
          <List className={classes.menuList}>
            <ListItem button onClick={() => handleTabClick('profile')}>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Профіль"/>
            </ListItem>
            <ListItem button onClick={() => handleTabClick('edit')}>
              <ListItemIcon>
                <EditIcon/>
              </ListItemIcon>
              <ListItemText primary="Редагувати профіль"/>
            </ListItem>
            <ListItem button onClick={() => handleTabClick('history')}>
              <ListItemIcon>
                <HistoryIcon/>
              </ListItemIcon>
              <ListItemText primary="Історія"/>
            </ListItem>
            <ListItem button onClick={() => handleTabClick('bookmarks')}>
              <ListItemIcon>
                <BookmarksIcon/>
              </ListItemIcon>
              <ListItemText primary="Збереженні"/>
            </ListItem>
          </List>

        {activeTab === 'edit' ? (
          <Grid container>
            <Grid item xs={8} className={classes.formEdit}>
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
            </Grid>
          </Grid>
        ) : activeTab === 'history' ? (
          <Grid container spacing={0}>
            {/* Content for history tab */}
            <Grid item xs={8} className={classes.formEdit}>
              <Paper className={classes.paper}>
                <Typography variant="h5">Історія дій</Typography>
                {/* Add content for history tab */}
              </Paper>
            </Grid>
          </Grid>
        ) : activeTab === 'bookmarks' ? (
          <Grid container spacing={0}>
            {/* Content for settings tab */}
            <Grid item xs={8} className={classes.formEdit}>
              <Paper className={classes.paper}>
                <Typography variant="h5">Збереженні</Typography>
                {/* Add content for settings tab */}
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Fragment>
            <Grid container spacing={0}>
              <Grid item xs={3} className={classes.avatarForm}>
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
              <Grid item xs={5} className={classes.contentForm}>
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
                    >
                      Редагувати профіль
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Fragment>
        )}
    </div>
  );
};

export default HomeForm;
