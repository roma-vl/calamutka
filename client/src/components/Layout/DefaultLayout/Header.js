import React, { useState, useRef } from "react";
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

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

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
              <div onMouseLeave={handleMenuClose} ref={menuRef}>
                  <IconButton
                    onMouseEnter={handleMenuOpen}
                    size="large"
                    color="inherit"
                    edge="end"
                    aria-label="account of current user"
                  >
                      <AccountCircleIcon
                        sx={{ fontSize: '32px' }}
                      />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
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
                            width: 'max-content', // Змінено на 'max-content'
                            minWidth: '200px', // Додано мінімальну ширину
                        },
                    }}
                  >
                      {authService.isUserLoggedIn() ? (
                        [
                            <MenuItem key="logout" onClick={handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>,
                            <MenuItem key="account" component={Link} to="/account" onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                Account Settings
                            </MenuItem>
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
    );
};

export default Header;
