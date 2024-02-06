import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import authService from "../../../services/authService";
import logout from "../../../pages/Auth/Logout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                  <Typography variant="h6" color="inherit" noWrap sx={{ marginRight: '50px' }}>
                      Company name
                  </Typography>
                  <Button component={Link} to="/" color="inherit">Home</Button>
                  <Button component={Link} to="/pricing" color="inherit">Pricing</Button>
                  <Button component={Link} to="/album" color="inherit">Support</Button>
              </div>
              <div>
                  <IconButton
                    onClick={handleMenuOpen}
                    size="large"
                    color="inherit"
                    edge="end"
                  >
                      <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                      {authService.isUserLoggedIn() ? (
                        <>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            <MenuItem component={Link} to="/account" onClick={handleMenuClose}>Account Settings</MenuItem>
                        </>
                      ) : (
                        <>
                            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
                            <MenuItem component={Link} to="/register" onClick={handleMenuClose}>Register</MenuItem>
                        </>
                      )}
                  </Menu>
              </div>
          </Toolbar>
      </AppBar>
    );
};

export default Header;
