import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";


const Header = () => (

            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Company name
                    </Typography>
                    <nav>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="/"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Home
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="pricing"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Pricing
                        </Link>
                        <Link
                            variant="button"
                            color="text.primary"
                            href="album"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Support
                        </Link>
                    </nav>
                    <Button href="sign-in" variant="outlined" sx={{ my: 1, mx: 0.5 }}>
                        Sign-In
                    </Button>
                    <Button href="sign-up" variant="outlined" sx={{ my: 1, mx: 0.5 }}>
                        Sign-Up
                    </Button>
                </Toolbar>
            </AppBar>
);

export default Header;
