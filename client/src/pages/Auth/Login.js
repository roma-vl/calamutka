import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '../../services/authService'
import AlertComponent from '../../components/Alert/AlertComponent';

const defaultTheme = createTheme();

export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleAlertClose = () => {
        setAlertOpen(false);
        setErrors(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await authService.loginUser(formData);
            console.log(data)
            if (data.code && data.code === 401) {
                const errorMessages = data.message;
                setErrors(errorMessages);
                setAlertOpen(true);
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (authService.isUserLoggedIn()) {
        return <Navigate to="/" />;
    }

    return (
      <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
              >
                  <AlertComponent
                    errors={errors}
                    onClose={handleAlertClose}
                    width={200}
                    open={alertOpen}
                  />
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                      Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                          Sign In
                      </Button>
                      <Grid container>
                          <Grid item xs>
                              <Link href="/forgot-password" variant="body2">
                                  Forgot password?
                              </Link>
                          </Grid>
                          <Grid item>
                              <Link href="/register" variant="body2">
                                  {"Don't have an account?"}
                              </Link>
                          </Grid>
                      </Grid>
                  </Box>
              </Box>

          </Container>
      </ThemeProvider>
    );
}
