// import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'routes/app.routes'
import Layout from "./pages/Layout/Layout";
  function App() {
    return (
        <BrowserRouter>
            <Layout>
                <AppRoutes />
            </Layout>
        </BrowserRouter>
    )
  }

export default App;

// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import ProTip from './ProTip';
// import Copyright from './Copyright';
//
// export default function App() {
//     return (
//         <Container maxWidth="sm">
//             <Box sx={{ my: 4 }}>
//                 <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
//                     Material UI Preact example
//                 </Typography>
//                 <ProTip />
//                 <Copyright />
//             </Box>
//         </Container>
//     );
// }
