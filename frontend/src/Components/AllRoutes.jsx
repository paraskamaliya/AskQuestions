import { Route, Routes, useLocation } from "react-router-dom"
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import AddQuestion from "../Pages/AddQuestion";
import SingleQuestion from "../Pages/SingleQuestion";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/MyProfile";
import MyQuestions from "../Pages/MyQuestions";
import { AnimatePresence } from "framer-motion";
import AdminHome from "./AdminHome";
import UserInfo from "./UserInfo";

const AllRoutes = () => {
    const location = useLocation();
    return <AnimatePresence>
        <Routes location={location} key={location.key}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={
                <PrivateRoute>
                    <AddQuestion />
                </PrivateRoute>
            } />
            <Route path="/question/:id" element={
                <PrivateRoute>
                    <SingleQuestion />
                </PrivateRoute>
            } />
            <Route path="/profile" element={
                <PrivateRoute>
                    <MyProfile />
                </PrivateRoute>
            } />
            <Route path="/myquestions" element={
                <PrivateRoute>
                    <MyQuestions />
                </PrivateRoute>
            } />
            <Route path="/admin" element={
                <PrivateRoute>
                    <AdminHome />
                </PrivateRoute>
            } />
            <Route path="/userinfo/:id" element={
                <PrivateRoute>
                    <UserInfo />
                </PrivateRoute>
            } />
        </Routes>
    </AnimatePresence>
}
export default AllRoutes;