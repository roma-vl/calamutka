import { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'react-toastify/dist/ReactToastify.css';
import Container from "@mui/material/Container";
import LeftMenuCabinet from "./LeftMenuCabinet";
import ProfileEditForm from "./ProfileEditForm";
import UserInfo from "./UserInfo";
import History from "./History";
import Bookmarks from "./Bookmarks";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));




const Cabinet = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector(state => state.user.userData);

  const getHashFromUrl = () => {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : ''; // видаляємо символ '#'
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.location.href = `/cabinet#${tab}`;
  };

  useEffect(() => {
    const hash = getHashFromUrl();
    setActiveTab(hash || 'profile');
  }, []);
  if (!user) {
    return null;
  }
  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <LeftMenuCabinet activeTab={activeTab} handleTabClick={handleTabClick} />
          </Grid>
          <Grid item xs={9}>
            {activeTab === 'edit' ? (
              <ProfileEditForm user={user || null} />
            ) : activeTab === 'history' ? (
              <History />
            ) : activeTab === 'bookmarks' ? (
              <Bookmarks />
            ) : (
              <Fragment>
                <UserInfo user={user || null}/>
              </Fragment>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Cabinet;
