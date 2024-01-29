// Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const defaultTheme = createTheme();
const Layout = ({ children }) => (
    <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Header />
        {children}
        <Footer />
    </ThemeProvider>
);

export default Layout;
