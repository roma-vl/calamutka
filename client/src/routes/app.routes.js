import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Pricing from 'pages/Pricing/Pricing';
import SignIn from 'pages/Auth/SignIn';
import SignUp from 'pages/Auth/SignUp';
import Album from 'pages/Album/Album';
import DefaultLayout from '../components/Layout/DefaultLayout/DefaultLayout';
import AuthLayout from '../components/Layout/AuthLayout/AuthLayout';

const AppRoutes = () => (
  <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="pricing" element={<DefaultLayout><Pricing /></DefaultLayout>} />
        <Route path="album" element={<DefaultLayout><Album /></DefaultLayout>} />

        <Route path="sign-in" element={<AuthLayout><SignIn /></AuthLayout>} />
        <Route path="sign-up" element={<AuthLayout><SignUp /></AuthLayout>} />
  </Routes>
);

export default AppRoutes;
