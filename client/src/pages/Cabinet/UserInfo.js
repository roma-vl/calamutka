import { Fragment, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import AvatarEditor from 'react-avatar-editor';
import { toast, ToastContainer } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { Link } from "react-router-dom";

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
    marginBottom: 40,
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
  dialogContent: {
    textAlign: 'center',
  },
}));

const UserInfo = ({ user , handleTabClick}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(user.profile_picture);
  const editorRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const notify = () => toast("Wow so easy!");
  const [state, setState] = useState({
    scale: 1,
    rotate: 0,
    width: 300,
    height: 300,
    allowZoomOut: false,
    isTransparent: false,
    border: 0,
  });
  const handleCloseModal = () => setOpenModal(false);
  const handleDrop = (droppedFiles) => setImage(droppedFiles[0]);

  const urlToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleOpenModal = async () => {
    if (typeof user.profile_picture === 'string') {
      const base64Image = await urlToBase64(user.profile_picture);
      setImage(base64Image); // Передаємо Base64 в AvatarEditor
    }
    setOpenModal(true);
  };

  const handleScaleChange = (e) => setState({ ...state, scale: parseFloat(e.target.value) });
  const handleRotateLeft = () => setState({ ...state, rotate: (state.rotate - 90) % 360 });
  const handleRotateRight = () => setState({ ...state, rotate: (state.rotate + 90) % 360 });

  const handleSave = () => {
    const img = editorRef.current.getImageScaledToCanvas().toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "avatar.png";

    toast.success("Success Notification !", {
      position: "top-right"
    });
    setOpenModal(false);
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
              startIcon={<EditIcon />}
              className={classes.editIcon}
              onClick={handleOpenModal}
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
                component={Link}
                to="/cabinet#edit"
                onClick={() => {handleTabClick('edit')}}
              >Редагувати профіль </Button>

            </div>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Вибір фото профілю</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Dropzone onDrop={handleDrop} noClick noKeyboard>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <AvatarEditor
                  ref={editorRef}
                  image={image}
                  scale={state.scale}
                  width={state.width}
                  height={state.height}
                  rotate={state.rotate}
                />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          <div>
            Zoom:
            <input
              type="range"
              min={state.allowZoomOut ? '0.1' : '1'}
              max="2"
              step="0.01"
              value={state.scale}
              onChange={handleScaleChange}
            />
            <br />
            Rotate:
            <button onClick={handleRotateLeft}>Left</button>
            <button onClick={handleRotateRight}>Right</button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Закрити</Button>
          <Button onClick={handleSave} color="primary">Зберегти</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default UserInfo;
