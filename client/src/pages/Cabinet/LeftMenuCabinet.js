import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  menuLists: {
    width: 270,
    padding: 12
  },
  listItems: {
    height: 44,
    width: 270
  }
}));

const LeftMenuCabinet = ({ activeTab, handleTabClick }) => {
  const classes = useStyles();

  return (
    <List className={classes.menuLists}>
      <ListItem
        button
        component={Link}
        to="/cabinet#profile"
        selected={activeTab === 'profile'}
        onClick={() => handleTabClick('profile')}
        className={classes.listItems}
      >
        <ListItemIcon>
          <AccountCircleIcon/>
        </ListItemIcon>
        <ListItemText primary="Профіль"/>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/cabinet#edit"
        selected={activeTab === 'edit'}
        onClick={() => handleTabClick('edit')}
        className={classes.listItems}
      >
        <ListItemIcon>
          <EditIcon/>
        </ListItemIcon>
        <ListItemText primary="Редагувати профіль"/>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/cabinet#history"
        selected={activeTab === 'history'}
        onClick={() => handleTabClick('history')}
        className={classes.listItems}
      >
        <ListItemIcon>
          <HistoryIcon/>
        </ListItemIcon>
        <ListItemText primary="Історія"/>
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/cabinet#bookmarks"
        selected={activeTab === 'bookmarks'}
        onClick={() => handleTabClick('bookmarks')}
        className={classes.listItems}
      >
        <ListItemIcon>
          <BookmarksIcon/>
        </ListItemIcon>
        <ListItemText primary="Збереженні"/>
      </ListItem>
    </List>
  );
};

export default LeftMenuCabinet;
