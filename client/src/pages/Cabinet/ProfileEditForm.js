import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  infoItem: {
    marginBottom: theme.spacing(1)
  },
  editIcon: {
    cursor: 'pointer',
  },
}));

const UserInfoForm = ({ user }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    birthdate: '',
    gender: '',
    language: '',
  });

  useEffect(() => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      bio: user.bio,
      birthdate: user.birthdate,
      gender: user.gender,
      language: user.language,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Paper className={classes.paper}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.infoItem}>
              <TextField
                label="Ім'я"
                variant="outlined"
                className={classes.input}
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoItem}>
              <TextField
                label="Прізвище"
                variant="outlined"
                className={classes.input}
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
        </Grid>
        <div className={classes.infoItem}>
          <TextField
            label="Логін"
            variant="outlined"
            className={classes.input}
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.infoItem}>
          <TextField
            label="Емейл"
            variant="outlined"
            className={classes.input}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.infoItem}>
              <TextField
                label="Телефон"
                variant="outlined"
                className={classes.input}
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoItem}>
              <TextField
                label="Дата народження"
                variant="outlined"
                className={classes.input}
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
        </Grid>
      <div className={classes.infoItem}>
        <TextField
          label="Адреса"
          variant="outlined"
          className={classes.input}
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          />
        </div>
        <div className={classes.infoItem}>
          <TextField
            label="Про себе"
            variant="outlined"
            className={classes.input}
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.infoItem}>
              <TextField
                select
                label="Стать"
                variant="outlined"
                className={classes.input}
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Чоловіча</MenuItem>
                <MenuItem value="Female">Жіноча</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.infoItem}>
              <TextField
                select
                label="Мова"
                variant="outlined"
                className={classes.input}
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <MenuItem value="English">Англійська</MenuItem>
                <MenuItem value="Spanish">Іспанська</MenuItem>
                <MenuItem value="French">Французька</MenuItem>
              </TextField>
            </div>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon/>}
          className={classes.editIcon}
        >
          Зберегти зміни
        </Button>
      </form>
    </Paper>
  );
};

export default UserInfoForm;
