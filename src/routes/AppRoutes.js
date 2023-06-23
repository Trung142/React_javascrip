import Home from '../compement/Home';
import Tableuser from '../compement/Tableuser';
import Login from '../compement/Login';
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
import NotFound from './Notfound';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/user"
                    element={
                        <PrivateRoutes>
                            <Tableuser />
                        </PrivateRoutes>
                    }
                />
                <Route path='*' element={<NotFound />} />
            </Routes>

        </>
    )
}
export default AppRoutes;