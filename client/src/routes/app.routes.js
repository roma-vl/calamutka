import {Routes, Route} from 'react-router-dom';
import Home from 'pages/Home/Home';
import Pricing from 'pages/Pricing/Pricing';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import Album from 'pages/Album/Album';
import DefaultLayout from '../components/Layout/DefaultLayout/DefaultLayout';
import AuthLayout from '../components/Layout/AuthLayout/AuthLayout';
import Cabinet from "../pages/Cabinet/Cabinet";
import Сheckout from "../pages/Checkout/Checkout";
import CabinetMessage from "../pages/Cabinet/CabinetMessage";
import Product from "../pages/Product/Product";
import PaymentAndDelivery from "../pages/static-page/PaymentAndDelivery";
import Contacts from "../pages/static-page/Contacts";
import Promotions from "../pages/static-page/Promotions";
import Reviews from "../pages/static-page/Reviews";

const AppRoutes = () => (
  <Routes>
    <Route path="/"                element={<DefaultLayout><Home/></DefaultLayout>}/>
    <Route path="/product/:slug"   element={<DefaultLayout><Product/></DefaultLayout>}/>
    <Route path="/cabinet"         element={<DefaultLayout><Cabinet/></DefaultLayout>}/>
    <Route path="/cabinet/message" element={<DefaultLayout><CabinetMessage/></DefaultLayout>}/>
    <Route path="/pricing"         element={<DefaultLayout><Pricing/></DefaultLayout>}/>
    <Route path="/album"           element={<DefaultLayout><Album/></DefaultLayout>}/>
    <Route path="/checkout"        element={<DefaultLayout><Сheckout/></DefaultLayout>}/>

    <Route path="/payment"        element={<DefaultLayout><PaymentAndDelivery/></DefaultLayout>}/>
    <Route path="/contacts"        element={<DefaultLayout><Contacts/></DefaultLayout>}/>
    <Route path="/promotions"        element={<DefaultLayout><Promotions/></DefaultLayout>}/>
    <Route path="/reviews"        element={<DefaultLayout><Reviews/></DefaultLayout>}/>

    <Route path="/login"           element={<AuthLayout><Login/></AuthLayout>}/>
    <Route path="/register"        element={<AuthLayout><Register/></AuthLayout>}/>
  </Routes>
);

export default AppRoutes;
