import {Routes, Route} from 'react-router-dom';
import Home from 'pages/Home/Home';
import Pricing from 'pages/Pricing/Pricing';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import Album from 'pages/Album/Album';
import DefaultLayout from '../components/Layout/DefaultLayout/DefaultLayout';
import AuthLayout from '../components/Layout/AuthLayout/AuthLayout';
import Cabinet from "../pages/Cabinet/Cabinet";

const AppRoutes = () => (
  <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/cabinet" element={<DefaultLayout><Cabinet /></DefaultLayout>} />
        <Route path="/pricing" element={<DefaultLayout><Pricing /></DefaultLayout>} />
        <Route path="/album" element={<DefaultLayout><Album /></DefaultLayout>} />

        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
  </Routes>
);

export default AppRoutes;
