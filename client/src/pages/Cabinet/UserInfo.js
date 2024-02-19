import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { toast, ToastContainer } from 'react-toastify';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: 'auto',
    marginBottom: 40
  },
  userInfo: {
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
  },
  editIcon: {
    cursor: 'pointer',
  },
  infoItem: {
    marginBottom: theme.spacing(1),
  },
}));

const UserInfo = ({user}) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const notify = () => toast("Wow so easy!");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };



  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <Avatar alt="Profile Photo" src={user.profile_picture} className={classes.avatar}/>
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
        <Grid item md={8}>
          <Paper className={classes.paper}>
            <div className={classes.userInfo}>
              <Typography variant="h4">{user.first_name + ' ' +  user.last_name}</Typography>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Емейл: {user.email}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Логін: {user.username}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Дата реєстрації: {user.created_at}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Статус облікового запису: {user.account_status}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Адреса: {user.address}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Про себе: {user.bio}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Дата народження: {user.birthdate}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Телефон: {user.phone}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Стать: {user.gender}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Мова: {user.language}</Typography>
              </div>
              <div className={classes.infoItem}>
                <Typography variant="subtitle1">Роль: {user.role}</Typography>
              </div>
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
  );
};

export default UserInfo;
