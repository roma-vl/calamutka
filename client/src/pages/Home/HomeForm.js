import React from 'react';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
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
}));

const HomeForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Photo Column */}
        <Grid item xs={3}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Профіль" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Редагувати профіль" />
            </ListItem>
            {/* Додайте інші посилання за необхідності */}
          </List>
        </Grid>   {/* Photo Column */}
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            {/* Add your profile photo component here */}
            <Avatar alt="Profile Photo" src="/path/to/photo.jpg" className={classes.avatar} />
          </Paper>
        </Grid>

        {/* Information Columns */}
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {/* Add your profile information components here */}
            <div className={classes.userInfo}>
              <Typography variant="h4">User's Name</Typography>
              <Typography variant="subtitle1">Email: user@example.com</Typography>
              <Typography variant="subtitle1">Registration Date: 01/01/2022</Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                className={classes.editIcon}
              >
                Edit Profile
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeForm;
