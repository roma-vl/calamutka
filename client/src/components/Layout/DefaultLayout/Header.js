import React, {useState, useRef, Fragment, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import authService from "../../../services/authService";
import logout from "../../../pages/Auth/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import HistoryIcon from "@material-ui/icons/History";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ChatIcon from '@mui/icons-material/Chat';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Close from '@mui/icons-material/Close';
import Cart from "../../Cart/Cart";
import {Badge} from "@mui/material";
import store from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {loadCartFromLocalStorage} from "../../../redux/actions/cartActions";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        margin: 'auto',
        marginBottom: 40
    },
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const productsInCart = useSelector(state => state.cart.products);
    const user = useSelector(state => state.user.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleMenuClose = (event) => {
        if (!menuRef.current.contains(event.currentTarget)) {
            setAnchorEl(null);
            setMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            document.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <Fragment>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" color="inherit" noWrap>
                          Company name
                      </Typography>
                      <Button component={Link} to="/" color="inherit">Home</Button>
                      <Button component={Link} to="/pricing" color="inherit">Pricing</Button>
                      <Button component={Link} to="/album" color="inherit">Support</Button>
                  </div>
                  <div ref={menuRef}>
                      {authService.isUserLoggedIn() ? <IconButton
                          size="large"
                          color="inherit"
                          edge="end"
                          aria-label="account of current user"
                          onClick={() => setIsCartOpen(true)}
                        >

                            <Badge color="secondary" badgeContent={productsInCart.length}>
                                <ShoppingCartIcon key="icon" sx={{ fontSize: '32px' }} />
                            </Badge>
                        </IconButton>
                        : ''}
                      <IconButton
                        onMouseEnter={handleMenuOpen}
                        size="large"
                        color="inherit"
                        edge="end"
                        aria-label="account of current user"
                      >
                          {authService.isUserLoggedIn() ?
                            <Avatar key="avatar" alt="Profile Photo" src={user && user.profile_picture} className={useStyles.avatar} />
                            :
                            <AccountCircleIcon key="icon" sx={{ fontSize: '32px' }} />
                          }

                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        onMouseEnter={handleMenuOpen}
                        onMouseLeave={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            style: {
                                marginTop: '50px',
                                width: 'max-content',
                                minWidth: '200px',
                            },
                        }}
                      >
                          {authService.isUserLoggedIn() ? (
                            [
                                <MenuItem key="name">Привіт, {user ? (user.first_name + ' ' + user.last_name) : ('Гість')}</MenuItem>,
                                <MenuItem key="cabinet" component={Link} to="/cabinet" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="small" />
                                    </ListItemIcon>
                                    Профіль
                                </MenuItem>,
                                <MenuItem key="cabinet-message" component={Link} to="/cabinet/message" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <ChatIcon fontSize="small" />
                                    </ListItemIcon>
                                    Повідомлення
                                </MenuItem>,
                                <MenuItem key="cabinet-edit" component={Link} to="/cabinet#edit" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    Редагувати профіль
                                </MenuItem>,
                                <MenuItem key="cabinet-history" component={Link} to="/cabinet#history" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <HistoryIcon fontSize="small" />
                                    </ListItemIcon>
                                    Історія переглядів
                                </MenuItem>,
                                <MenuItem key="cabinet-bookmarks" component={Link} to="/cabinet#bookmarks" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <BookmarksIcon fontSize="small" />
                                    </ListItemIcon>
                                    Закладки
                                </MenuItem>,
                                <MenuItem key="logout" onClick={handleLogout}>
                                    <ListItemIcon>
                                        <ExitToAppIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>,

                            ]
                          ) : (
                            [
                                <MenuItem key="login" component={Link} to="/login" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <LoginIcon fontSize="small" />
                                    </ListItemIcon>
                                    Login
                                </MenuItem>,
                                <MenuItem key="register" component={Link} to="/register" onClick={handleMenuClose}>
                                    <ListItemIcon>
                                        <PersonAddIcon fontSize="small" />
                                    </ListItemIcon>
                                    Register
                                </MenuItem>
                            ]
                          )}
                      </Menu>
                  </div>
              </Toolbar>
          </AppBar>
          <Cart isOpen={isCartOpen} handleCloseCart={() => setIsCartOpen(false)} />
      </Fragment>
    );
};

export default Header;
