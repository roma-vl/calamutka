import { Home } from 'pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Pricing from "../pages/Pricing/Pricing";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Album from "../pages/Album/Album";

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/album' element={<Album />} />
    </Routes>
)

export default AppRoutes
